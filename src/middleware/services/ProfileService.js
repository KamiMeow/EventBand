export default {

	/**
	 * Посылает запрос на получение информации о пользователе (профиль)
	 */
	getProfileInfo() {
		return this.apiClient.get('profile');	
	},

	/**
	 * Посылает запрос на изменение данных пользователя
	 * @param {Object} profileInfo Объект с данными пользователя для обновления
	 * @param {string} profileInfo.nickname - псевдоним пользователя
	 * @param {string} profileInfo.email - почта пользователя
	 * @param {string} profileInfo.surname - фамилия пользователя
	 * @param {string} profileInfo.name - имя пользователя
	 * @returns {Promise} 
	 */
	updateProfileInfo( profileInfo ) {
		return this.apiClient.put('profile', { ...profileInfo });
	},

	/**
	 * Посылает запрос на отписку от мероприятия
	 * @param {String} uuid - UUID мероприятия
	 * @returns {Promise}
	 */
	unsubscribeFromEvent( uuid ) {
		return this.apiClient.get(`event/unsubscribe/${uuid}`);
	},

	/**
	 * Посылает запрос на отписку от организации
	 * @param {String} uuid  - UUID организации 
	 * @returns {Promise}
	 */
	unsubscribeFromOrganization( uuid ) {
		return this.apiClient.get(`organization/unsubscribe/${uuid}`);
	},

	/**
	 * Посылает запрос на получение содержимого ленты рекомендаций (события, организации)
	 * @returns {Promise}
	 */
	requestRecomendedContent() {
		return this.apiClient.get('event/event-recommended');
	},

	/**
	 * Посылает запрос на получение ленты новостей
	 * @returns {Promise}
	 */
	requestOrganizationsNews() {
		return this.apiClient.get('event/event-feed');
	},

	/**
	 * Посылает запрос на подписку новостей от организации
	 * @param {String} uuid - UUID организации
	 * @returns {Promise}
	 */
	async subscribeOnOrganization(uuid) {
		let res = await this.apiClient.get(`organization/subscribe/${uuid}`);
		return (res.status >= 400) ? ({ 
			message: res.data.message, 
			type: 'error', 
		}) : ({
			message: res.data.message,
			type: 'success',
		});
	},

	/**
	 * Посылает запрос на подписку на мероприятие
	 * @param {String} uuid - UUID мероприятия
	 * @returns {Promise}
	 */
	async subscribeOnEvent(uuid) {
		let res = await this.apiClient.get(`event/subscribe/${uuid}`);
		return (res.status >= 400) ? ({
			message: res.data.message,
			type: 'error',
		}) : ({
			message: res.data.message,
			type: 'success',
		});
	}
}