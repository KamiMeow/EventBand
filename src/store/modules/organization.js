import services from '@/middleware';
const { OrganizationService } = services;


export const initialState = () => ({});


export const actions = {
	async createNewOrganization({ commit }, orgInfo) {
		let { organization = null, message = null } = (await OrganizationService.createOrganization( orgInfo )).data;
		return organization ? commit('profile/PUSH_NEW_ORGANIZATION', organization, { root: true }) : { message };
	}
};

export const getters = {
	
};