<template>
    <v-container
			class="d-flex flex-column justify-center align-center"
			style="height: 70vh;"
		>
			<h2 class="mb-5" > Create new account </h2>
			<v-form 
				v-model="valid"
				class="width-l d-flex flex-column"
				ref="form"
				@submit.prevent="signUpNewuserAccount"
			>
				<v-text-field
					v-model="email"
					:rules="[rules.required, rules.email]"
					placeholder="example@mail.com"
					color="primary"
					maxlength="25"
					label="Email"
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
					maxlength="20"
					validate-on-blur
					clearable
					outlined
					counter
					dense
				></v-text-field>
				<v-text-field
					v-model="name"
					:rules="[rules.required, rules.min('name')]"
					placeholder="John"
					color="primary"
					maxlength="20"
					label="Name"
					validate-on-blur
					clearable
					outlined
					counter
					dense
				></v-text-field>
				<v-text-field
					v-model="nickname"
					:rules="[rules.required, rules.min('nickname')]"
					placeholder="GrassBoy"
					color="primary"
					maxlength="20"
					label="Nickname"
					validate-on-blur
					clearable
					outlined
					counter
					dense
				></v-text-field>
				<v-text-field
					v-model="password"
					:rules="[rules.required, rules.min('password')]"
					placeholder="Some strong pass"
					label="Password"
					type="password"
					color="primary"
					maxlength="18"
					validate-on-blur
					clearable
					outlined
					counter
					dense
				></v-text-field>
				<v-btn
					type="submit"
					class="white--text align-self-center"
					color="primary"
				>
					Sign Up
				</v-btn>
			</v-form>
		</v-container>
</template>

<script>
export default {
	data: () => ({
		email: '',
		surname: '',
		name: '',
		nickname: '',
		password: '',
		valid: false,
	}),
	methods: {
		async signUpNewuserAccount() {

			if ( !this.$refs.form.validate() ) return;

			console.log(this.email);
			console.log(this.surname);
			console.log(this.name);
			console.log(this.nickname);
			console.log(this.password);

			let resp = await this.$store.dispatch('auth/signUp', {
				email: this.email,
				surname: this.surname,
				name: this.name,
				nickname: this.nickname,
				password: this.password,
			});
			
			
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