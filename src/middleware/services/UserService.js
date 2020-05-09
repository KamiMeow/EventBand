const url = "users";

export default {
	signIn( email, password ) {
		return this.apiClient.post('login', { email, password });
	},

	signUp ( email, nickname,  ) {
		return this.apiClient.post('register', {});
	},
}