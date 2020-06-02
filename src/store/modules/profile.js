// TODO set comments
import services from '@/middleware'
const { ProfileService } = services;

/**
 * Инициализирует объект с необходимыми 
 * свойствами для хранения данных о пользователе
 * @returns { Object } Объект с данными пользователя
 */
const initialUser = () => ({
	email: 'example@example.com',
	nickname: 'example-nickname',
	avatar: '/alien.svg', 
	surname: 'Brown',
	name: 'John',
});

export const initialState = () => ({
	/** Profile page */
	actualUser: initialUser(),
	editableUser: initialUser(),
	/** Profile page */
	organizations: [],
	subOrganizations: [],
	subEvents: [],
	/** Event feed page */
	recomendedOrganizations: [],
	recomendedEvents: [],
	organizationsNews: [],
});

export const mutations = {

	SIGN_IN: (state, user) => {
		state.actualUser.email = state.editableUser.email = user.email;
		state.actualUser.nickname = state.editableUser.nickname = user.nickname;
		state.actualUser.surname = state.editableUser.surname = user.surname;
		state.actualUser.name = state.editableUser.name = user.name;
		state.actualUser.avatar = state.editableUser.avatar = user.avatar;
	},

	SET_SUB_EVENTS_LIST: (state, events) => {
		state.subEvents = events || [];
	},

	SET_SUB_ORGANIZATIONS_LIST: (state, organizations) => {
		state.subOrganizations = organizations || [];
	},

	UNSET_EDITABLE_USER: (state) => {
		state.editableUser = { ...state.actualUser };
	},

	SET_ACTUAL_USER: (state, user) => {
		state.actualUser = { ...user };
	},

	PUSH_NEW_ORGANIZATION: (state, organization) => {		
		state.organizations.push(organization);
	},

	SET_ORGANIZATIONS_LIST: (state, list) => {
		state.organizations = list;		
	},

	SET_ORGANIZATIONS_NEWS: (state, news) => {
		state.organizationsNews = news;
	},

	SET_RECOMENDED_CONTENT: (state, { organizations, events }) => {
		state.recomendedEvents = events;
		state.recomendedOrganizations = organizations;
	},
};

export const actions = {
	unsetEditableUser({ commit }) {
		commit('UNSET_EDITABLE_USER');
	},

	async setActualUser({ commit }, user) {
		let response = (await ProfileService.updateProfileInfo({
			nickname: user.nickname,
			email: user.email,
			surname: user.surname,
			name: user.name,
		})).data;

		console.log(response);
		
		if (response.message !== undefined) {
			commit('UNSET_EDITABLE_USER');
			return { message: response.message, };
		} else {
			commit('SET_ACTUAL_USER', response.user);
		}
	},

	async getProfile({ commit }) {
		let resp = (await ProfileService.getProfileInfo()).data;
		console.log(resp);
		commit('SIGN_IN', resp.user);
		commit('SET_ORGANIZATIONS_LIST', resp.organizations);
		commit('SET_SUB_ORGANIZATIONS_LIST', resp.subscriptions.organizations);
		commit('SET_SUB_EVENTS_LIST', resp.subscriptions.events);
	},

	async removeUserSubscribeEvent({ dispatch }, uuid) {
		console.log('from action', uuid, 'event');
		
		const { message = null } = (await ProfileService.unsubscribeFromEvent(uuid)).data;
		let result = await dispatch('getProfile');
		console.log('result', result);
		return result;
	},

	async removeUserSubscribeOrganization({ commit, dispatch }, uuid) {
		// console.log('from action', uuid, 'organization');
		
		const res = await ProfileService.unsubscribeFromOrganization(uuid);
		let result = await dispatch('getProfile');
		console.log('result', result);
		return res;
	},

	async requestOrganizationsNews({ commit }) {
		let { news } = (await ProfileService.requestOrganizationsNews()).data;
		console.log(news);
		
		commit('SET_ORGANIZATIONS_NEWS', news);
	},
	
	async requestRecomendedContent({ commit }) {
		let { organizations, events } = (await ProfileService.requestRecomendedContent()).data;
		console.log(events);
		 commit('SET_RECOMENDED_CONTENT', {
			 organizations,
			 events,
		 });
	},
	
	// TODO Решить что делать, обновлять рекоменды или нет
	async subscribeOnOrganization(_, uuid) {
		let response = await ProfileService.subscribeOnOrganization(uuid);
		return response;
	},

	async subscribeOnEvent(_, uuid) {
		let response = await ProfileService.subscribeOnEvent(uuid);
		return response;
	},

}; 

export const getters = {
	getActualUser: state => state.actualUser,
	getEditableUser: state => state.editableUser,
	getUserOrganizations: state => state.organizations,
	getUserSubOrganizations: state => state.subOrganizations,
	getUserSubEvents: state => state.subEvents,
	getRecomendedEvents: state => state.recomendedEvents,
	getRecomendedOrganizations: state => state.recomendedOrganizations,
	getOrganizationsNews: state => state.organizationsNews,

};

