<template>
	<v-container
		class="d-flex flex-column justify-center align-center"
		style="height: 80vh;"
	>
		<form-base
			ref="resetPasswordForm"
			@submit.prevent="sendEmailToRecoverPassword"
		>
				<template #title> 
					<span class="display-1"> Reset password </span>
				</template>
				<template #default>
					<v-layout justify-center>
						<v-text-field
							v-model="emailForResetPassword"
							:rules="[rules.required, rules.email]"
							label="Your E-mail"
							class="width-l"
							outlined
							dense
						/>
					</v-layout>  
				</template>
				<template #actions>
					<v-layout justify-center>
						<v-btn 
							:loading="loading"
							class="white--text"
							color="primary"
							type="submit"
							dense
						> Recover </v-btn>
					</v-layout> 
				</template>
		</form-base>
	</v-container>
</template>

<script>
import FormBase from '@/components/base/FormBase';

export default {
	name: 'ResetPassword',

	components: {
		FormBase,
	},

	
	mounted() {
		this.$refs.resetPasswordForm.setAlert(this.infoTip , 'info');
	},
	
	data: () => ({
		emailForResetPassword: '',
		infoTip: `Enter the email address 
							that your account is linked to.`,
		loading: false,
		
	}),
	
	methods: {
		async sendEmailToRecoverPassword() {
			
			this.loading = true;

			let message = await this.$store.dispatch('nonauth/requestPassword', { 
				email: this.emailForResetPassword, 
			});

			console.log(message);
			

			return this.handleMessageType(message);
		},

		handleMessageType(responseMessageObj) {
			this.$refs.resetPasswordForm.setAlert(responseMessageObj.message, responseMessageObj.type);
			this.loading = false;
		},
	},

	computed: {
		rules() {
			return this.$store.getters['getRules'];
		},
	},
}
</script>

<style src="@/scss/_width.scss" lang="scss">
	
</style>