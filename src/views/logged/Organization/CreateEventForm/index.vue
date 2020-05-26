<template>
	<v-layout
		fill-height
		justify-center
		align-content-center
	>
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
			<v-btn
				color="error"
			@click="$router.go(-1)"
			>
				Go back
			</v-btn>
			<v-stepper v-model="stepper">
				<v-stepper-header>
					<v-stepper-step :complete="stepper > 1" step="1">Describe Event</v-stepper-step>

					<v-divider></v-divider>

					<v-stepper-step :complete="stepper > 2" step="2">Choose place</v-stepper-step>

					<v-divider></v-divider>

					<v-stepper-step :complete="stepper > 3" step="3">Create tickets</v-stepper-step>

					<v-divider></v-divider>

					<v-stepper-step step="4">Finishing</v-stepper-step>
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
								<span class="display-1"> We`ve collected all information </span>
							</v-card-title>
							<v-card-subtitle>
								<span class="title"> If you want to create your Event, press submit button </span>
							</v-card-subtitle>
							<v-flex xs2>
								<v-btn
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
	</v-layout>
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

	created() {
		this.prepareForm();
	},

	data: () => ({
		stepper: "1",
		isPreparing: true,
		isRequesting: false,
		
		rawEventInfo: {},
		rawEventPlace: {},
		rawEventTickets: [],
		
	}),

	computed: { },

	methods: {
		async prepareForm() {
			this.isPreparing = true;
			await this.$store.dispatch('nonauth/requestAllTags');
			let timer = setTimeout( () => { this.isPreparing = false; clearTimeout(timer) }, 750 );
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