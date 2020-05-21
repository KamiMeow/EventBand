export default {
	requestPassword( email ) {
		return this.apiClient.get('request-password', { email, });
	},

	getAllTags() {
		return this.apiClient.get('tag/all');
	},

	requestEvents(params) {
		return this.apiClient.get(`event-list?`, { ...params });
	},

	subscribeOnEvent( formData ) {
		return this.apiClient.post(`subscribe`, { ...formData });
	},

	changePassword( password ) {

	},

	
}