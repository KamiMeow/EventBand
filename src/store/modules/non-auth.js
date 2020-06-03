// TODO set comments
import services from "@/middleware";
const { GeneralService } = services;

export const initialState = () => ({
	tags: [],
	events: [],
	currentEvent: {},
	currentOrganization: {},
});


export const mutations = {
	SET_TAGS: (state, tags) => {
		state.tags = tags || [];
	},
	SET_EVENTS: (state, events) => {
		state.events = events || [];
	},

	SET_CURRENT_EVENT: (state, event) => {		
		console.log(event);
		
		state.currentEvent = event;
	},

	SET_CURRENT_ORGANIZATION: (state, organization) => {
		state.currentOrganization = organization;
	},

	RESET_CURRENT_EVENT: (state) => {
		state.currentEvent = {};
	},

	RESET_CURRENT_ORGANIZATION: (state) => {
		state.currentEvent = {};
	},

	RESET_EVENTS: (state) => {
		state.events.splice(0, state.events.length);
	},
};

export const actions = {
	async requestPassword( _, { email }) {
		let message = (await GeneralService.requestPassword( email )).data;
		return message;
	},

	async requestAllTags({ commit }) {
		let { tags = [] } = (await GeneralService.getAllTags()).data;
		commit('SET_TAGS', tags);
	},
	
	async requestEvents({ commit, state, getters }, {params, isLogged}) {
		try {
			let { events = [] } = (await GeneralService.requestEvents(params, isLogged)).data;
			commit('SET_EVENTS', events);
			console.log(events);
		} catch (e) {
			commit('SET_EVENTS', []);
		}
	},

	async subscribeOnEvent(_, formData) {
		let { message = undefined } = (await GeneralService.subscribeOnEvent(formData)).data;
		return message; 
	},

	async requestEventInfo({ commit }, uuid) {
		let resp = (await GeneralService.requestEventInfo(uuid)).data;		
		return resp.event ? commit('SET_CURRENT_EVENT', resp) : resp.message;
	},

	async requestOrganizationInfo({ commit }, uuid) {
		let resp = (await GeneralService.requestOrganizationInfo(uuid)).data;
		return resp.organization ? commit('SET_CURRENT_ORGANIZATION', resp) : resp.message;
	},

	resetCurrentEvent({ commit }) {
		commit('RESET_CURRENT_EVENT');
	},

	resetCurrentOrganization({ commit }) {
		commit('RESET_CURRENT_ORGANIZATION');
	},

	changePassword({ getters } , { password }) {
		
	},

	resetEvents({commit}) {
		commit('RESET_EVENTS');
	},
};

export const getters = {
	getAllTags: state => state.tags,
	getEvents: state => state.events,
	getCurrentEvent: state => state.currentEvent,
	getCurrentOrganization: state => state.currentOrganization,
};
