
export default {
	createOrganization( {name, description, logo} ) {
		let formData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('logo', logo);
		return this.apiClient.post('organization/create', formData);
	},

	async signInAsOrganization( uuid ) {
		let response = await this.apiClient.get(`organization/login/${uuid}`);
		let errorMessage = {
			data: {
				message: {
					message: '',
					type: 'error',
				},
			},
		};
		
		if (response.status === 403 || response.status === 404) {
			return errorMessage.message = response.data.message;
		}

		this.apiClient.login(response.data.organizationToken);
		return response;
	},

	getMyOrganizationInfo( ) {
		return this.apiClient.get(`my-organization/`);
	},

	sendInviteBeOrganizer( email ) {
		return this.apiClient.post('my-organization/organizers/request', { email });
	},

	createNews( news ) {
		return this.apiClient.post('my-organization/news/create', { ...news });
	},

	getMyNews() {
		return this.apiClient.get('my-organization/news/all');
	},

	async updateOrganizationInfo( info ) {
		return this.apiClient.put('my-organization/', { ...info });
	},

}