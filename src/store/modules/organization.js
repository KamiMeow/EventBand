import services from '@/middleware';
const { OrganizationService } = services;

const initialOrganization = () => ({
	id: '',
	uuid: '',
	name: '',
	logo: '',
	reputation: 0,
	description: '',
});

export const initialState = () => ({ 
	uuid: '',
	subscribersAmount: 0,
	actualOrganization: initialOrganization(),
	editableOrganization: initialOrganization(),
	organizers: [],
	events: [],
	news: [],
});


export const mutations = {
	SET_ORGANIZATION_INFO: (state, { subscribers, organization, events, organizers }) => {

		state.subscribersAmount = subscribers;
		state.uuid = organization.uuid;
		state.organizers = organizers;
		state.events = events;
	},

	SET_MAIN_ORG_INFO: (state, organization) => {
		console.log(organization);
		
		state.actualOrganization.id = state.editableOrganization.id = organization.id;
		state.actualOrganization.uuid = state.editableOrganization.uuid = organization.uuid;
		state.actualOrganization.name = state.editableOrganization.name = organization.name;
		state.actualOrganization.logo = state.editableOrganization.logo = organization.logo;
		state.actualOrganization.reputation = state.editableOrganization.reputation = organization.reputation;
		state.actualOrganization.description = state.editableOrganization.description = organization.description;
	},

	SET_NEWS: (state, news) => {
		state.news = news;
	},

	UNSET_EDITABLE_INFO: (state) => {
		state.editableOrganization = { ...state.actualOrganization };
	},
};	

export const actions = {
	
	async createNewOrganization({ commit }, orgInfo) {
		let { organization = null, message = null } = (await OrganizationService.createOrganization( orgInfo )).data;
		return organization ? commit('profile/PUSH_NEW_ORGANIZATION', organization, { root: true }) : { message };
	},

	async signInAsOrganization({ dispatch }, uuid) {
		let response = (await OrganizationService.signInAsOrganization(uuid)).data;
		
		if (response.message) {
			return response.message;
		} else {
			dispatch('auth/signInAsOrganization', { token: response.organizationToken, uuid: uuid, }, { root: true })
			return { isNext: true };
		}
	},

	async getMyOrganizationInfo({ commit }) {
		let organizationInfo = (await OrganizationService.getMyOrganizationInfo()).data;		
		commit('SET_ORGANIZATION_INFO', organizationInfo);
		commit('SET_MAIN_ORG_INFO', organizationInfo.organization);
	},

	async sendInviteBeOrganizer(_, email) {
		let response = (await OrganizationService.sendInviteBeOrganizer(email)).data;
		// console.log(response);
	},

	async createNews({ dispatch }, news) {
		let response = (await OrganizationService.createNews( news )).data;
		console.log(response);
		dispatch('getMyNews');
	},

	async getMyNews({ commit }) {
		let { news = null, message = null} = (await OrganizationService.getMyNews()).data;
		console.log(news);
		
		commit('SET_NEWS', news);
	},

	async updateOrganizationInfo({ commit }, orgInfo) {
		let { message = null, organization = null } = (await OrganizationService.updateOrganizationInfo(orgInfo)).data;
		if (organization) {
			commit('SET_MAIN_ORG_INFO', organization);
		}
		return !!organization;
	},	

	unsetEditableOrganization({commit}) {
		commit('UNSET_EDITABLE_INFO');
	},

};

export const getters = {
	getOrganizationToken: state => state.currentOrganizationToken,
	getFollowersAmount: state => state.subscribersAmount,
	getActualOrganization: state => state.actualOrganization,
	getEditableOrganization: state => state.editableOrganization,
	getEvents: state => state.events,
	getOrganizers: state => state.organizers,
	getUuid: state => state.uuid,
	getNews: state => state.news,
};