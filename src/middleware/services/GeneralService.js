import Verifier from 'email-verifier';

export default {
	requestPassword( email ) {
		return this.apiClient.get('request-password', { email, });
	},

	getAllTags() {
		return this.apiClient.get('tag/all');
	},

	requestEvents(params, isLogged) {
		console.log(isLogged);
		
		if (isLogged) {
			return this.apiClient.get(`event/event-list?`, { ...params });
		}
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