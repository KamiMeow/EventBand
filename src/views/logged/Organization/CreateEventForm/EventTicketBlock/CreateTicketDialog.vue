<template>
	<v-layout>
		
		<v-dialog
			v-model="onDialog"
			@click:outside="leftDialog"
			width="500px"
		>
			<template #activator={on}>
				<v-btn
					v-on="on"
				>
					Add another ticket
					<v-icon>
						mdi-plus
					</v-icon>
				</v-btn>
			</template>

			<form-base	
				ref="form"
				@submit.prevent="createTicket"
			>
				<template #title>
					<v-layout justify-center>
						<span class="title pa-4"> Add your new ticket to the Event </span>
					</v-layout>
				</template>

				<v-layout column>
					<v-text-field
						v-model="name"
						label="Ticket name"
						prepend-icon="mdi-format-title"
						outlined
						counter
						dense
						append-icon="mdi-close"
						@click:append="name = ''"
					/>

					<v-textarea
						v-model="description"
						prepend-icon="mdi-text"
						rows="6"
						no-resize
						clearable
						outlined
						counter
						filled
					/>

					<v-text-field
						v-model="count"
						:min="1"
						:max="10000"
						prepend-icon="mdi-counter"
						label="Tickets count"
						type="number"
						outlined
						counter
						dense
						append-icon="mdi-close"
						@click:append="name = ''"
					/>

					<v-text-field
						v-model="price"
						type="number"
						:min="0"
						:max="1500"
						prepend-icon="mdi-currency-usd"
						label="Ticket price"
						outlined
						counter
						dense
						append-icon="mdi-close"
						@click:append="name = ''"
					/>

					<v-layout justify-space-around>
						<v-flex xs5>
							<calendar-input
								v-model="dateStart"
								:showCurrent="dateFrom"
								:maxDate="dateTo"
							/>
						</v-flex>
						<v-flex xs5>
							<time-input
								v-model="timeStart"
							/>
						</v-flex>
					</v-layout>
					<v-layout justify-space-around>
						<v-flex xs5>
							<calendar-input
								v-model="dateEnd"
								:showCurrent="dateStart"
								:maxDate="dateTo"
							/>
						</v-flex>
						<v-flex xs5>
							<time-input
								v-model="timeEnd"
							/>
						</v-flex>
					</v-layout>

				</v-layout>

				<template #actions>
					<v-layout justify-space-around>
						<v-btn
							@click="reset"
							color="warning"
						>
							Reset
						</v-btn>
						<v-btn
							type="submit"
							:loading="loading"
							color="success"
						>
							Create ticket
							<v-icon> mdi-checked </v-icon>
						</v-btn>
					</v-layout>
				</template>
			</form-base>
		</v-dialog>
	</v-layout>
</template>

<script>
import CalendarInput from '@/components/helper/DateTimePicker/CalendarInput';
import TimeInput from '@/components/helper/DateTimePicker/TimeInput';
import FormBase from '@/components/base/FormBase';

export default {
	name: 'CreateTicketDialog',

	components: {
		CalendarInput,
		TimeInput,
		FormBase,
	},

	props: {
		dateFrom: String,
		timeFrom: String,
		dateTo: String,
		timeTo: String,
	},

	created() {
		this.setDates();
	},

	data: () => ({
		onDialog: false,
		loading: false,

		name: '',
		description: '',
		count: 1,
		price: 0,

		dateStart: '',
		dateEnd: '',
		timeStart: '00:00',
		timeEnd: '00:00',

		maxCount: 10000,
		minCount: 1,
		maxPrice: 1500,
		minPrice: 0,

	}),

	

	methods: {
		setDates() {
			this.dateStart = this.dateFrom;
			this.dateEnd = this.dateTo;
		},

		leftDialog() {
			this.reset();
			this.onDialog = false;
		},
		async createTicket() {
			this.loading = true;
			await this.$store.dispatch('event/createTicket', {
				name: this.name,
				description: this.description,
				count: this.count,
				price: this.price,
				datetimeFrom: `${this.dateStart}T${this.timeStart}Z`,
				datetimeTo: `${this.dateEnd}T${this.timeEnd}Z`,
			});

			this.reset();
			this.loading = false;
			this.onDialog = false;
		},
		reset() {
			this.name = '';
			this.description = '';
			this.timeEnd = '00:00';
			this.timeStart = '00:00';
			this.price = 0;
			this.count = 1;
			this.setDates();
		},
		// TODO CHECK THIS SHIT
		checkCount(e) {
			console.log((e + '').length);
			
			this.count = (e + '').length
				? (
					e > this.maxCount
						? this.maxCount
						: e
				)
				: this.minCount;
		}
	},
}
</script>