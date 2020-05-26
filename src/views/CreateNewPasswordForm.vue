<template>
	<v-layout
		fill-height 
		justify-center 
		align-center
		max-width="450px"
	>
		<form-base
			ref="form"
			@submit.prevent="submitNewPassword"
		>
			<template #title >
				<span> Create new password </span>
			</template>
			<template #default> 
				<v-text-field
					v-model="newPassword"
					:rules="[rules.min('password'), rules.required]"
					:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
					:type="show1 ? 'text' : 'password'"
					label="New password"
					class="width-l"
					tabindex="1"
					outlined
					counter
					dense
					@click:append="show1 = !show1"
				/>
				<v-text-field
					v-model="submitedPassword"
					:rules="[rules.min('password'), rules.required]"
					:append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
					:type="show2 ? 'text' : 'password'"
					label="Repeat your password"
					class="width-l"
					tabindex="2"
					outlined
					counter
					dense
					@click:append="show2 = !show2"
				/>
			</template>
			<template #actions>
				<v-layout fill-width justify-center> 
					<v-btn 
						color="primary"
						type="submit"
						:loading="isProcessing"
					> 
						Submit password 
					</v-btn>
				</v-layout>
			</template>
		</form-base>
	</v-layout>
</template>


<script>
import FormBase from '@/components/base/FormBase';

export default {
	name: 'CreateNewPasswordForm',
	components: {
		FormBase,
	},

	created() {
		this.token = this.$route.params.token;
		console.log(this.token);
	},

	data: () => ({
		token: '',
		isProcessing: false,
		show1: false,
		show2: false,
		newPassword: '',
		submitedPassword: '',
	}),

	methods: {
		async submitNewPassword() {
			if ( !this.comparePassword(this.newPassword, this.submitedPassword) ) {
				
				this.$refs.form.setAlert('Fields must have the same values', 'error');
				return;
			}
			this.isProcessing = true;
			let message = await this.$store.dispatch('changePassword', { 
				password: this.newPassword,
				token: this.token,
			});
			console.log(message);
			
			this.isProcessing = false;

			if ( message ) {
				return this.$refs.form.setAlert(message.message, 'error');
			}
			
			this.$router.push('/sign-in');
		},

		comparePassword( newPass, subPass ) {
			return newPass.trim() === subPass.trim();
		},
	},

	computed: {
		rules() {
			return this.$store.getters['getRules'];
		},
	},
}
</script>

<style src="@/scss/_width.scss" lang="scss"/>



