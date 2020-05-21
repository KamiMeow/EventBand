<template>
<div>
	<v-dialog v-model="dialog" persistent max-width="30vw">
		<template #activator="{ on }">
			<v-btn color="primary" dark v-on="on">Reset password</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<v-layout justify-center>
					<span class="headline">Do you want to change your password?</span>
				</v-layout>
			</v-card-title>
			<v-card-text>
			</v-card-text>
			<v-card-actions>
				<v-layout 
					fill-width
					justify-space-around=""
				>
					<v-btn color="error" @click="dialog = false">Close</v-btn>
					<v-btn color="success" @click="resetPassword">Agree</v-btn>
				</v-layout>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<v-dialog v-model="successDialog" max-width="600px">
		<v-alert
			type="success"
			align="center"
		>
			Check your E-mail
		</v-alert> 
	</v-dialog>
</div>
</template>

<script>
export default {
	data: () => ({
		dialog: false,
		successDialog: false,
	}),

	methods: {
		resetPassword() {
			this.dialog = false;
			this.successDialog = true;
			setTimeout( () => { this.successDialog = false }, 2000);
			this.$store.dispatch('nonauth/requestPassword', { 
				email: this.$store.getters['profile/getActualUser'].email,
			});
		}
	},
}
</script>