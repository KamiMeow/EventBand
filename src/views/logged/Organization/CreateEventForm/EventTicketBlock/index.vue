<template>
	<v-layout 
		wrap
	>
		<v-flex xs12>
			<v-layout 
				class="py-4"
				justify-start
			>
				<v-btn
					class="mx-2"
					color="success darken-2"
					@click="submitEventTickets"
					:disabled="!tickets.length"
				>
					Submit tickets
				</v-btn>
				<create-ticket-dialog
					:dateFrom="eventInfo.dateFrom"
					:dateTo="eventInfo.dateTo"
					:timeFrom="eventInfo.timeFrom"
					:timeTo="eventInfo.timeTo"
				/>

				<span class="ml-4">
					Tickets amount:  
					<span class="title">
						{{ticketsAmount}}
					</span> 
				</span>

			</v-layout>
		</v-flex>
		<v-flex xs12>
			<v-divider/>
		</v-flex>
		<v-flex xs12>
			<v-layout column>
				<v-card
					v-for="ticket in tickets"
					:key="ticket.uuid"
					class="custom-elevation my-2"
					color="primary lighten-2"
				>
					<v-layout wrap>
						<v-flex xs2>
							<v-card-title class="white--text">
								{{ticket.name}}
							</v-card-title>
							<v-card-subtitle class="white--text">
								{{ticket.description}}
							</v-card-subtitle>
						</v-flex>
						<v-flex xs2 class="white--text px-1">
							<v-layout 
								justify-center
								fill-height
								column
							>
								Starts
								<span> Date: {{ticket.from.date}} </span>
								<span> Time: {{ticket.from.time}} </span>
							</v-layout>
						</v-flex>
						<v-flex xs2 class="white--text px-1">
							<v-layout 
								justify-center
								fill-height
								column
							>
								Ends
								<span> Date: {{ticket.to.date}} </span>
								<span> Time: {{ticket.to.time}} </span>
							</v-layout>
						</v-flex>
						<v-spacer/>
						<v-flex xs1>
							<v-layout 
								justify-center 
								align-center
								fill-height 
							>
								<v-btn
									color="error"
									@click="removeTicket(ticket)"
								>
									delete
								</v-btn>
							</v-layout>
						</v-flex>
					</v-layout>
				</v-card>
			</v-layout>
		</v-flex>
	</v-layout>
</template>


<script>
import CreateTicketDialog from './CreateTicketDialog';

export default {
	name: 'EventTicketInfo',

	props: {
		eventInfo: Object,
	},

	components: {
		CreateTicketDialog,
	},

	computed: {
		tickets() {
			return this.$store.getters['event/getCreatedTickets'].map( t => {
				return {
					...t,
					from: {
						date: t.datetimeFrom.split('T')[0],
						time: t.datetimeFrom.split('T')[1].split('.')[0],
					},
					to: {
						date: t.datetimeTo.split('T')[0],  
						time: t.datetimeFrom.split('T')[1].split('.')[0],
					},
				}
			});
		},

		ticketsAmount() {
			return this.tickets.length
		},
	},

	methods: {
		removeTicket(ticket) {
			this.$store.dispatch('event/removeTicket', ticket);
		},

		submitEventTickets() {
			let count = 0;
			this.tickets.forEach( t => count += t.count);

			this.$emit('handle-event-ticket-block', { 
				count,
				tickets: this.tickets.map( t => t.id),
			});
		},
	},
}
</script>