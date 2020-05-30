
export default {
		createEvent(event) {
			return this.apiClient.post('my-organization/event/create', { ...event });
		},

		createTicket( ticket ) {			
			return this.apiClient.post('my-organization/ticket/create', ticket);
		},

		removeTicket( uuid ) {
			return this.apiClient.delete(`my-organization/ticket/${uuid}`);
		},

		subscribeOnEvent(uuid) {
			return this.apiClient.get(`event/subscribe/${uuid}`);
		},
}