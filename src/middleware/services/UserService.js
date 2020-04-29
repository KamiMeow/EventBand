const url = "users";

export default {
	signIn( email, password ) {
		// return this.apiClient.post('login', { email, password });
		return { 
				data: {
					user: {
						email: 'example@gmail.com',
						nickname: 'Johny boy',
						surname: 'Brown',
						name: 'John',
				}
			} 
		}; 
	},
}