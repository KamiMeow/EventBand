export default {
	async getPreviousMessages( chatUuid ) {
		let obj = await this.apiClient.get(`chat/${chatUuid}`);
		console.log('CS', obj);
		return obj;
	},
};