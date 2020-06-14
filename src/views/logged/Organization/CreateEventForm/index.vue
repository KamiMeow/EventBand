<template>
		<v-layout v-if="isPreparing"
			fill-height
			justify-center
			align-center
		>
			<v-progress-circular
				:size="50"
				color="accent"
				indeterminate
			/>
		</v-layout>
		<v-flex v-else xs10>
			<v-stepper v-model="stepper">
				<v-stepper-header>
					<v-stepper-step 
						:complete="stepper > 1" 
						:editable="isEditEvent"
						step="1"
					>
						{{isEditEvent ? 'Edit event info' : 'Describe event'}}
					</v-stepper-step>

					<v-divider></v-divider>

					<v-stepper-step 
						:complete="stepper > 2" 
						:editable="isEditEvent"
						step="2"
					>
						{{isEditEvent ? 'Edit place' : 'Choose place'}}
					</v-stepper-step>

					<template v-if="!isEditEvent">
						<v-divider></v-divider>

						<v-stepper-step 
							:complete="stepper > 3" 
							:editable="isEditEvent"
							step="3"
						>
							{{isEditEvent ? 'Edit tickets' : 'Create tickets'}}
						</v-stepper-step>

						<v-divider/>
						<v-stepper-step 
							:editable="isEditEvent"
							step="4"
						>
							Submit event information
						</v-stepper-step>
					</template>
				</v-stepper-header>
				<v-stepper-content step="1">
					<event-info-block @handle-event-info-block="handleInfo"/>
				</v-stepper-content>
				<v-stepper-content step="2">
					<event-place-block @handle-event-place-block="handlePlace"/>
				</v-stepper-content>
				<v-stepper-content step="3">
					<event-ticket-block 
						:eventInfo="rawEventInfo"
						@handle-event-ticket-block="handleTickets"
					/>
				</v-stepper-content>
				<v-stepper-content step="4">
					<v-card
						outlined
						height="auto"
						class="pa-10"
					>
						<v-layout  column align-center justify-center>
							<v-card-title>
								<span class="display-1">
									{{isEditEvent ? 'If you has edited all you need' : 'We`ve collected all information'}}
								</span>
							</v-card-title>
							<v-card-subtitle>
								<span class="title"> {{ isEditEvent ? 'Just press the submit button to confirm your new information about that event' : 'If you want to create your Event, press submit button'}} </span>
							</v-card-subtitle>
							<v-flex xs2>
								<v-btn
									v-if="isEditEvent"
									:loading="isRequesting"
									color="success darken-2"
									large
								>
									Submit
								</v-btn>
								<v-btn
									v-else
									:loading="isRequesting"
									color="success darken-2"
									large
									@click="createEvent"
								>
									Submit creation
								</v-btn>
							</v-flex>
						</v-layout>
					</v-card>
				</v-stepper-content>
			</v-stepper>
		</v-flex>
</template>

<script>
import EventInfoBlock from './EventInfoBlock';
import EventPlaceBlock from './EventPlaceBlock';
import EventTicketBlock from './EventTicketBlock';

export default {
	name: 'CreateEventForm',

	components: {
		EventInfoBlock,
		EventPlaceBlock,
		EventTicketBlock,
	},

	props: {
		isEdit: false,
		event: Object,
		selectedTags: Array,
		tags: Array,
	},

	created() {
		this.prepareForm();
	},

	beforeDestroy() {
		this.$store.dispatch('organization/setIsOnEditFalse');
	},

	data: () => ({
		stepper: "1",
		isPreparing: true,
		isRequesting: false,
		
		rawEventInfo: {},
		rawEventPlace: {},
		rawEventTickets: [],
		
	}),

	computed: { 
		isEditEvent() {
			return this.$store.getters['organization/getIsOnEdit'];
		},
	},

	methods: {
		async prepareForm() {
			this.isPreparing = true;
			await this.$store.dispatch('nonauth/requestAllTags');
			let timer = setTimeout( () => { this.isPreparing = false; clearTimeout(timer) }, 100 );
		},

		handleInfo(info) {
			console.log(info, 'info from main form');
			this.rawEventInfo = { ...info };
			this.stepper = '2';
		},

		handlePlace(place) {
			console.log(place, 'place from main form');
			this.rawEventPlace = { ...place };
			this.stepper = '3';
		},

		handleTickets(tickets) {
			console.log(tickets, 'tickets from main form');
			this.rawEventTickets =  { ...tickets };
			this.stepper = '4';
		},

		async createEvent() {
			this.isRequesting = true; 
			const event = {
				name: this.rawEventInfo.name,
				description: this.rawEventInfo.description,
				datetimeFrom: `${this.rawEventInfo.dateFrom}T${this.rawEventInfo.timeFrom}Z`,
				datetimeTo: `${this.rawEventInfo.dateTo}T${this.rawEventInfo.timeTo}Z`,
				coords: this.rawEventPlace.coords,
				count: this.rawEventTickets.count,
				tickets: this.rawEventTickets.tickets,
				tags: this.rawEventInfo.tags,
			};

			console.log('event full', event);

			await this.$store.dispatch('event/createEvent', event);
			this.isRequesting = false;
			this.$router.replace(`/my-organization`);
		},
	},
}
</script>