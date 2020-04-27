<template>
	<v-container
		class="d-flex flex-column justify-center align-center"
		style="height: 80vh;"
	>
		<v-form class="width-l" >
			<v-alert
				class="width-l"
				type="info"
			>
				<div>
					Enter the email address that your account is linked to.
					If an account with the specified email address exists, you will be sent an email for further password recovery.
				</div>
			</v-alert>
			<v-text-field
				v-model="emailForResetPassword"
				label="Your E-mail"
				outlined
				dense
			></v-text-field>
			<v-col cols="12" class="d-flex justify-center mt-0 pa-0" >
				<v-btn 
					@click="sendEmailToRecoverPassword"
					class="white--text"
					color="primary"
					dense
				> Recover </v-btn>
			</v-col>
		</v-form>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			emailForResetPassword: '',
		}
	},
	methods: {
		sendEmailToRecoverPassword() {
			this.$router.push('/sign-in');
		}
	}
}
</script>

<style src="@/scss/_width.scss" lang="scss">
	
</style>