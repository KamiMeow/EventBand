<template>
    <v-layout
			column
			justify-center
			align-center
			fill-height
		>
			<form-base
				ref="signUpForm"
				@submit.prevent="signUpNewUserAccount"
			>
				<template #title>
					 <v-row>
						<v-col cols="12" align="center"> {{ formTitle }} </v-col>
					</v-row>
				</template>
				<template #actions>
					<v-row>
						<v-col align="center">
							<v-btn
								type="submit"
								class="white--text align-self-center"
								color="primary"
							>
								Sign Up
							</v-btn>
						</v-col>
					</v-row>
				</template>
				<v-text-field
					v-model="email"
					:rules="[rules.required, rules.email]"
					placeholder="example@mail.com"
					color="primary"
					class="width-l"
					maxlength="25"
					label="Email"
					tabindex="1"
					validate-on-blur
					clearable
					outlined
					counter
					dense
				/>
				<v-text-field
					v-model="surname"
					:rules="[rules.required, rules.min('surname')]"
					placeholder="Brown"
					label="Surname"
					color="primary"
					class="width-l"
					maxlength="20"
					tabindex="2"
					validate-on-blur
					clearable
					outlined
					counter
					dense
				/>
				<v-text-field
					v-model="name"
					:rules="[rules.required, rules.min('name')]"
					placeholder="John"
					color="primary"
					class="width-l"
					maxlength="20"
					label="Name"
					tabindex="3"
					validate-on-blur
					clearable
					outlined
					counter
					dense
				/>
				<v-text-field
					v-model="nickname"
					:rules="[rules.required, rules.min('nickname')]"
					placeholder="GrassBoy"
					color="primary"
					maxlength="20"
					label="Nickname"
					class="width-l"
					tabindex="4"
					validate-on-blur
					clearable
					outlined
					counter
					dense
				/>
				<v-text-field
					v-model="password"
					:rules="[rules.required, rules.min('password')]"
					placeholder="Some strong pass"
					label="Password"
					type="password"
					class="width-l"
					color="primary"
					maxlength="18"
					tabindex="4"
					validate-on-blur
					clearable
					outlined
					counter
					dense
				/>
				<template #actions>
					<v-row>
						<v-col align="center">
							<v-btn
								:loading="loading"
								class="white--text align-self-center"
								color="primary"
								type="submit"
								tabindex="5"	
							>
								Sign Up
							</v-btn>
						</v-col>
					</v-row>
				</template>
			</form-base>
		</v-layout>
</template>

<script>
import FormBase from '@/components/base/FormBase';

export default {
	name: 'SignUp',

	components: {
		FormBase,
	},

	data: () => ({
		loading: false,

		email: '',
		surname: '',
		name: '',
		nickname: '',
		password: '',

		formTitle: 'Sign Up',
	}),
	methods: {
		async signUpNewUserAccount() {
			this.loading = true;
			let exists = await this.$store.dispatch('auth/verifyEmail', this.email);
			this.loading = false;

			if (!exists) {
				this.$store.dispatch('notification/set', {
					message: 'Email doesn`t exist',
					type: 'error',
				});
				this.email = '';
				return;
			}

			let resp = await this.$store.dispatch('auth/signUp', {
				email: this.email,
				surname: this.surname,
				name: this.name,
				nickname: this.nickname,
				password: this.password,
			}) || {};			

			if (resp.message) {
				return this.$refs.signUpForm.setAlert(resp.message, 'error');
			}
			
			this.$router.replace('/porifle');
			
		}
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