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

	async requestEventInfo( uuid ) {
		console.log(await this.apiClient.get(`event/${uuid}`));
		return this.apiClient.get(`event/${uuid}`);
	},

	requestOrganizationInfo( uuid ) {
		return this.apiClient.get(`organization/${uuid}`);
	},

	changePassword( password ) {

	},

	
}