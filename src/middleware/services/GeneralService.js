export default {
	requestPassword( email ) {
		return this.apiClient.get('request-password', { email, });
	},

	changePassword( password ) {

	},
}