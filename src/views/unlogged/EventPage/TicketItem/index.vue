<template>
	<v-flex xs12 class="my-2">
		<v-card 
			class="custom-elevation pa-4"
			outlined
		>
			<v-layout align-center>
				<v-flex xs12 md4 lg4>
					<span class="title mx-2">
						{{ticket.name}}
					</span>
				</v-flex>

				<v-flex xs12 sm12 md3 lg3>
					<v-layout column>
						<span class="subtitle-2"> {{ticket.price}} (Price) </span>
						<span class="subtitle-2"> {{ticket.count}} (Count) </span>
					</v-layout>
				</v-flex>

				<v-flex xs12 sm12 md-grow lg-grow>
					<span class="subtitle-2 mx-2 text-left"> {{ticket.description}} </span>
				</v-flex>

				<v-flex>
					<template v-if="!isOrg">
						<v-layout v-if="isLogged" column align-center>
							<v-btn
								:disabled="ticket.wasBuy"
								:loading="loading"
								class="align-self-center ma-2"
								color="secondary"
								depressed
								right
								small
								@click="buyTicket"
							> 
								Book ticket
							</v-btn>

							<div v-if="ticket.wasBuy" class="caption text-center">
								The ticket has already been purchased
							</div>
						</v-layout>

						<book-dialog
							v-else
							:ticketUuid="ticket.uuid"
						/>
					</template>
				</v-flex>
			</v-layout>
		</v-card>

		<v-snackbar 
			v-model="snackbar"
			:color="snackbarType"
			:timeout="2000"
		>
			{{ snackbarMessage }}
			<v-icon 
				color="white"
				class="mx-2"
				@click="snackbar = false"
			> 
				mdi-close-circle 
			</v-icon>
		</v-snackbar>
	</v-flex>	
</template>

<script>
import bookDialog from './bookDialog';

export default {
	name: 'TicketItem',

	components: {
		bookDialog,
	},

	props: {
		ticket: Object,
	},

	data: () => ({
		loading: false,
		snackbar: false,
		snackbarMessage: '',
		snackbarType: 'success',
	}),

	computed: {
		isLogged() {
			return this.$store.getters['auth/getIsLogged'];
		},

		isOrg() {
			return this.$store.getters['auth/getIsLoggedAsOrganization'];
		},
	},

	methods: {
		async buyTicket() {
			// this.loading = true;
			console.log(this.ticket.uuid);
			let message = await this.$store.dispatch('profile/subscribeOnEvent', this.ticket.uuid);
			this.snackbar = true;
			this.snackbarMessage = message.message;
			this.snackbarType = message.type;
		},
	},
}
</script>