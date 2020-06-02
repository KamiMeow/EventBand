import Verifier from 'email-verifier';

export default {
	/**
	 * Посылает запрос на восстановление пароля по почте
	 * @param {String} email 
	 * @returns {Promise} Promise
	 */
	requestPassword( email ) {
		return this.apiClient.get('request-password', { email, });
	},

	/**
	 * Посылает запрос на получение всех имеющихся тегов
	 * @returns {Promise} Promise
	 */
	getAllTags() {
		return this.apiClient.get('tag/all');
	},

	/**
	 * Посылает запрос на получение списка фильтрованных мероприятий
	 * @param {Object} params - параметры GET-запроса
	 * @param {Date} params.datetimeFrom - Дата начала интересуемого промежутка
	 * @param {Date} params.datetimeTo - Дата окончания интересуемого промежутка
	 * @param {Number} params.priceFrom - Минимальная цена билета
	 * @param {Number} params.reputation - Минимальная репутация организации, проводящей мероприятие
	 * @param {Array} params.tags - Теги поиска
	 * @param {Number} params.people - Максимальное кол-во людей на мероприятии
	 * @param {Boolean} isLogged 
	 * @returns {Promise} Promise
	 */
	requestEvents(params, isLogged) {		
		if (isLogged) {
			return this.apiClient.get(`event/event-list?`, { ...params });
		}
		return this.apiClient.get(`event-list?`, { ...params });
	},

	/**
	 * Посылает запрос на регистрацию на мероприятие
	 * @param {Object} formData - Объект с данными для регистрации на мероприятие 
	 * @param {String} formData.ticketUuid
	 * @param {String} formData.email 
	 * @param {String} formData.surname 
	 * @param {String} formData.name 
	 * @returns {Promise} Promise
	 */
	subscribeOnEvent( formData ) {
		return this.apiClient.post(`subscribe`, { ...formData });
	},

	/**
	 * Посылает запрос на получение информации об организации по UUID
	 * @param {String} uuid - UUID Мероприятия
	 * @returns {Promise} Promise
	 */
	async requestEventInfo( uuid ) {
		console.log(await this.apiClient.get(`event/${uuid}`));
		return this.apiClient.get(`event/${uuid}`);
	},

	/**
	 * Посылает запрос на получение информации об организации
	 * @param {Stribg} uuid - UUID Организации
	 * @returns {Promise} Promise
	 */
	requestOrganizationInfo( uuid ) {
		return this.apiClient.get(`organization/${uuid}`);
	},

	/**
	 * Посылает запрос на установку нового пароля
	 * @param {Object} info - Объект с токеном и новым паролем пользователя
	 * @param {String} info.token - Токен, по которому необходимо произвести изменение пароля
	 * @param {String} info.password - Новый пароль пользователя
	 * @returns {Promise} Promise
	 */
	async changePassword( info ) {
		let response = await this.apiClient.post('change-password', { ...info });
		console.log(response);
		
		if (response.status == 400) {
			return {
				message: response.data.message,
			};
		}
		return { nomessage: ''} ;
	},	

	/**
	 * Посылает запрос на whois API для проверки подлинности почты
	 * @param {String} email - Проверяемая почта
	 * @returns {Promise} Promise
	 */
	checkForEmailExistance(email) {
		let verifier = new Verifier('at_5nOXpnX089bInJ3LdliDUykgCjXfd');
		return new Promise((resolve, reject) => {
			verifier.verify(email, (err, data) => {
				if (err) throw err;
				console.log(data);
				resolve((data.dnsCheck && data.smtpCheck) || false);
			});
		}) 
		
	},

	
}