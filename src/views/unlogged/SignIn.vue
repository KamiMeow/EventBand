<template>
	<v-container
		class="d-flex align-center justify-center"
		style="height: 80vh;"
		fluid
	>
		<v-form
			v-model="valid"
			class="width-l"
			ref="form"
			@submit.prevent="signIn"
		>
			<h2 align="center"> Sign In </h2>
			<v-text-field
				v-model="email"
				:rules="[rules.email, rules.required]"
				color="purple darken-1"
				class="width-l"
				label="E-mail"
				validate-on-blur
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
				validate-on-blur
				clearable
				outlined
				counter
				dense
			/>
			<v-row class="null-indents d-flex justify-start">
				<v-col cols="4" class="null-indents"> 
					<v-btn
						to="/reset-password"
						class="text-none subtitle-1 purple--text pa-0"
						elevation="0"
						rounded
						x-small
						tile
						text
					> Forgot password? </v-btn> 
				</v-col>
				<v-col cols="6" class="null-indents"> 
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
				<v-col cols="12" class="null-indents mt-2" >
					<v-btn
						color="primary"
						type="submit"
					> SIGN IN </v-btn>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>

<script>

export default {
	data() {
		return {
			email: '',
			password: '',
			valid: false,
		}
	},
	methods: {
		async signIn() {
			if ( !this.$refs.form.validate() ) return;

			console.log(this.email);
			console.log(this.password);

			let resp = await this.$store.dispatch('auth/signIn', { 
				password: this.password,
				email: this.email, 
			});

		}
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