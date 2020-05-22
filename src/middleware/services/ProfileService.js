export default {
	getProfileInfo() {
		return this.apiClient.get('profile');	
	},

	/**
	 * 
	 * @param {Object} profileInfo Объект с данными пользователя для обновления
	 * @param {string} profileInfo.nickname 
	 * @param {string} profileInfo.email
	 * @param {string} profileInfo.surname 
	 * @param {string} profileInfo.name
	 * @returns {Promise} Promise c ответом API
	 */
	updateProfileInfo( profileInfo ) {
		return this.apiClient.put('profile', { ...profileInfo });
	},

	unsubscribeFromEvent( uuid ) {
		return this.apiClient.get(`event/unsubscribe/${uuid}`);
	},

	unsubscribeFromOrganization( uuid ) {
		return this.apiClient.get(`organization/unsubscribe/${uuid}`);
	},

	requestRecomendedContent() {
		return this.apiClient.get('event/event-recommended');
	},

	requestOrganizationsNews() {
		return this.apiClient.get('event/event-feed');
	},

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
}