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
	}
}