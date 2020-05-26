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

	
}