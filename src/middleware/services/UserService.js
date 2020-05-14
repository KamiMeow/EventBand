const url = "users";

export default {
	async signIn( email, password ) {
		let response = (await this.apiClient.post('login', { email, password })).data;
				
		if (response.user) {
			this.apiClient.login(response.user.token);
		}
		return response;
	},

	signUp ( user ) {
		return this.apiClient.post('register', { ...user });
	},
}