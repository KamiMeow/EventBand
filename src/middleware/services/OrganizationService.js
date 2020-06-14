
export default {
	
	/**
	 * Посылает запрос на создание организации
	 * @param {Object} Destructured - Деструктурированный параметр
	 * @param {String} Destructured.name - Название организации
	 * @param {String} Destructured.description  - Описание организации
	 * @param {File} Destructured.logo - Логотип организации
	 * @returns {Promise}
	 */
	createOrganization( {name, description, logo} ) {
		let formData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('logo', logo);
		return this.apiClient.post('organization/create', formData);
	},

	/**
	 * Послыает запрос на авторизацию в роли Организации
	 * @param {String} uuid - UUID организации
	 * @returns {Promise}
	 */
	async signInAsOrganization( uuid ) {
		let response = await this.apiClient.get(`organization/login/${uuid}`);
		let errorMessage = {
			data: {
				message: {
					message: '',
					type: 'error',
				},
			},
		};
		
		if (response.status === 403 || response.status === 404) {
			return errorMessage.message = response.data.message;
		}

		this.apiClient.login(response.data.organizationToken);
		return response;
	},

	/**
	 * Послыает запрос на получение всей информации об организации пользователя
	 * @returns {Promise}
	 */
	getMyOrganizationInfo() {
		return this.apiClient.get(`my-organization/`);
	},

	/**
	 * Посылает запрос на добавление пользователя в организацию в качестве администратора
	 * @param {String} email - Почта пользователя
	 * @returns {Promise}
	 */
	sendInviteBeOrganizer( email ) {
		return this.apiClient.post('my-organization/organizers/request', { email });
	},

	/**
	 * Посылает запрос на создание мероприятия
	 * @param {Object} news - Объект с необходимыми данными для создания мероприятия
	 * @param {String} news.title - Заголовок новости
	 * @param {String} news.text - Текст новости
	 * @returns {Promise}
	 */
	createNews( news ) {
		return this.apiClient.post('my-organization/news/create', { ...news });
	},

	/**
	 * Посылает запрос на получение всех новостей организации пользователя
	 * @returns {Promise}
	 */
	getMyNews() {
		return this.apiClient.get('my-organization/news/all');
	},

	/**
	 * Посылает запрос на изменение информации об организации
	 * @param {Object} info 
	 * @param {String} info.name - Название организации 
	 * @param {String} info.description - Описание организации 
	 * @returns {Promise}
	 */
	async updateOrganizationInfo( info ) {
		return this.apiClient.put('my-organization/', { ...info });
	},

	updateEventInfo(event) {
		return this.apiClient.put(`my-organization/event/${event.uuid}`, {
			...event,
		});
	},

}