<template>
	<v-container
		class="d-flex align-center justify-center"
		style="height: 80vh;"
		fluid
	>
		<form-base
			@submit="signIn"
			ref="signInForm"
		>
			<template #title> 
				<v-row>
					<v-col cols="12" align="center"> {{ formTitle }} </v-col>
				</v-row>
			</template>
			<template #afterTitle>
				<v-row class="d-flex justify-center">
					<v-col cols="6" align="center" class="null-indents"> 
						<v-btn
							to="/reset-password"
							class="text-none subtitle-1 purple--text pa-0"
							align="center"
							elevation="0"
							rounded
							x-small
							tile
							text
						> Forgot password? </v-btn> 
					</v-col>
					<v-col cols="6" align="center" class="null-indents"> 
						<v-btn
							to="/sign-up"
							class="text-none subtitle-1 purple--text pa-0"
							elevation="0"
							rounded
							x-small
							tile
							text
						> Create account? </v-btn> 
					</v-col>
				</v-row>
			</template> 
			<v-text-field
				v-model="email"
				:rules="[rules.email, rules.required]"
				color="purple darken-1"
				class="width-l"
				label="E-mail"
				tabindex="1"
				clearable
				outlined
				counter
				dense
			/>
			<v-text-field
				v-model="password"
				:rules="[rules.required, rules.min('password')]"
				color="purple darken-1"
				label="Password"
				class="width-l"
				type="password"
				tabindex="2"
				clearable
				outlined
				counter
				dense
			/>
			<template #actions>
				<v-row class="null-indents">
					<v-col cols="12" align="center" class="null-indents" >
						<v-btn
							:loading="loading"
							tabindex="3"
							color="primary"
							type="submit"
						> SIGN IN </v-btn>
					</v-col>
				</v-row>
			</template>
		</form-base>
	</v-container>
</template>

<script>
import FormBase from '@/components/base/FormBase';

export default {
	name: 'SignIn',

	components: {
		FormBase,
	},
	
	data() {
		return {
			loading: false,

			email: '',
			password: '',
			formTitle: 'Sign In',
		}
	},

	methods: {
		async signIn() {
			this.loading = true;
			let resp = await this.$store.dispatch('auth/signIn', { 
				password: this.password,
				email: this.email, 
			}) || {};
			this.loading = false;

			return resp.message
				? this.$refs.signInForm.setAlert(resp.message, 'error')
				: this.$router.replace('/profile');
		},
	},


	computed: {
		rules () {
			return this.$store.getters['getRules'];
		}
	}
}
</script>

<style src="@/scss/_width.scss" lang="scss" scoped>

</style>