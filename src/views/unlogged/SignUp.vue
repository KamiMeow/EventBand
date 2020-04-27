<template>
    <v-container
			class="d-flex flex-column justify-center align-center"
			style="height: 70vh;"
		>
			<h2 class="mb-5" > Create new account </h2>
			<v-form class="width-l d-flex flex-column">
				<v-text-field
					v-model="email"
					label="Email"
					placeholder="example@mail.com"
					color="primary"
					maxlength="25"
					clearable
					outlined
					counter
					dense
				></v-text-field>
				<v-text-field
					v-model="surname"
					placeholder="Brown"
					label="Surname"
					color="primary"
					maxlength="20"
					clearable
					outlined
					counter
					dense
				></v-text-field>
				<v-text-field
					v-model="name"
					placeholder="John"
					color="primary"
					maxlength="20"
					label="Name"
					clearable
					outlined
					counter
					dense
				></v-text-field>
				<v-text-field
					v-model="nickname"
					placeholder="GrassBoy"
					color="primary"
					maxlength="20"
					label="Nickname"
					clearable
					outlined
					counter
					dense
				></v-text-field>
				<v-text-field
					v-model="password"
					placeholder="Some strong pass"
					label="Password"
					type="password"
					color="primary"
					maxlength="18"
					clearable
					outlined
					counter
					dense
				></v-text-field>
				<v-btn
					@click="signUpNewuserAccount"
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
	data() {
		return {
			email: '',
			surname: '',
			name: '',
			nickname: '',
			password: '',
		}
	},
	methods: {
		signUpNewuserAccount() {

		}
	},
}
</script>

<style src="@/scss/_width.scss" lang="scss">
	
</style>