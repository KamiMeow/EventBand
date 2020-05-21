import services from "@/middleware";
const { GeneralService } = services;

export const initialState = () => ({
	tags: [],
	events: [],
});


export const mutations = {
	SET_TAGS: (state, tags) => {
		state.tags = tags || [];
	},
	SET_EVENTS: (state, events) => {
		state.events = events || [];
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
	
	async requestEvents({ commit, state }, params) {
		try {
			let { events = [] } = (await GeneralService.requestEvents(params)).data;
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

	changePassword({ getters } , { password }) {
		
	},
};

export const getters = {
	getAllTags: state => state.tags,
	getEvents: state => state.events,
};
