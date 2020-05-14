
export default {
	createOrganization( orgInfo ) {
		return this.apiClient.post('organization/create', orgInfo);
	}
}