const url = "users";

export default {

	/**
	 * Посылает запрос на авторизацию
	 * @param {String} email - Почта
	 * @param {String} password - Пароль
	 * @returns {Promise}
	 */
	async signIn( email, password ) {		
		let response;
		try {
			response = (await this.apiClient.post('login', { email, password })).data;
			
		} catch(e) {
			console.log(e);
			
		}
		
		if (response.user) {
			this.apiClient.login(response.user.token);
		}
		return response;
	},

	/**
	 * Посылает запрос на регистрацию пользователя
	 * @param {Object} user - Объект с данными
	 * @param {String} user.email - Почта пользователя
	 * @param {String} user.surname - Фамилия пользователя
	 * @param {String} user.name - Имя пользователя
	 * @param {String} user.nickname - Псевдоним (никнейм) пользователя
	 * @param {String} user.password - Пароль (никнейм) пользователя
	 * @returns {Promise}
	 */
	signUp ( user ) {
		return this.apiClient.post('register', { ...user });
	},
}