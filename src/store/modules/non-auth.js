import services from "@/middleware";
const { GeneralService } = services;

export const initialState = () => ({
	tags: [],
	events: [],
	currentEvent: {
			"event": {
					"id": 2,
					"uuid": "13c2db04-6375-47bc-a878-7a397ba4f3bd",
					"name": "Anime party 2.0",
					"description": "ANIME RETURN!!!",
					"datetimeTo": "2020-05-15T00:00:00.000Z",
					"coords": "(55.7522200, 37.5155600)",
					"datetimeFrom": "2020-05-12T00:00:00.000Z",
					"createdAt": "2020-05-21T22:08:16.404Z",
					"updatedAt": "2020-05-21T22:08:16.404Z",
					"OrganizationId": 1
			},
			"organization": {
					"id": 1,
					"uuid": "989713f3-2f0b-4a14-b863-d98b5c00f94e",
					"name": "Fregalo",
					"reputation": 9,
					"description": "\n          Normal fregal Sergeevich. Sounds honorable, looks stylish. Here, only fucked up in the head anime. Who are willing to sell their mother for ramen and a point for the opportunity to see waifa.\n          If you're not like that, just walk through and leave us alone. We don't touch you, don't touch us. Trust me, you'll be better off. We're fucked up tight, we can fuck you in all the holes if you just mention anime in our presence.\n        ",
					"logo": "fregalo.jpg",
					"createdAt": "2020-05-21T22:08:16.398Z",
					"updatedAt": "2020-05-21T22:08:16.398Z"
			},
			"tickets": [
					{
							"id": 2,
							"uuid": "50502b77-636d-4b5e-a956-b4c4f5d767b1",
							"name": "Anime ticket",
							"description": "Free now!!!",
							"count": 2000,
							"price": 0,
							"datetimeTo": "2020-05-15T00:00:00.000Z",
							"datetimeFrom": "2020-05-12T00:00:00.000Z",
							"createdAt": "2020-05-21T22:08:16.409Z",
							"updatedAt": "2020-05-21T22:08:16.409Z",
							"EventId": 2
					}
			],
			"tags": [
					{
							"id": 1,
							"uuid": "a4e5aba7-4241-4605-ad6f-8f5abbe258b8",
							"name": "Anime",
							"createdAt": "2020-05-21T22:08:16.414Z",
							"updatedAt": "2020-05-21T22:08:16.414Z"
					},
					{
							"id": 5,
							"uuid": "67d534cb-f185-442b-9b23-ffe9e5a50d7f",
							"name": "Gay",
							"createdAt": "2020-05-21T22:08:16.414Z",
							"updatedAt": "2020-05-21T22:08:16.414Z"
					},
					{
							"id": 8,
							"uuid": "fd663f29-3d6a-4ed1-9b01-61f9ece30b22",
							"name": "Painting",
							"createdAt": "2020-05-21T22:08:16.414Z",
							"updatedAt": "2020-05-21T22:08:16.414Z"
					},
					{
							"id": 18,
							"uuid": "ae825789-43bc-4c1f-980d-025a8db61184",
							"name": "Live discussion",
							"createdAt": "2020-05-21T22:08:16.414Z",
							"updatedAt": "2020-05-21T22:08:16.414Z"
					},
					{
							"id": 19,
							"uuid": "2e8647ca-6506-48f8-97cd-18b72335ac49",
							"name": "Fighting",
							"createdAt": "2020-05-21T22:08:16.414Z",
							"updatedAt": "2020-05-21T22:08:16.414Z"
					},
					{
							"id": 20,
							"uuid": "4aff7ced-045a-497c-838a-647622308336",
							"name": "Fisting",
							"createdAt": "2020-05-21T22:08:16.414Z",
							"updatedAt": "2020-05-21T22:08:16.414Z"
					},
					{
							"id": 23,
							"uuid": "5e082336-4d77-45e3-af8f-cc75943a661d",
							"name": "Lesbian",
							"createdAt": "2020-05-21T22:08:16.414Z",
							"updatedAt": "2020-05-21T22:08:16.414Z"
					},
					{
							"id": 24,
							"uuid": "272e41a0-ba5c-4ef0-b31b-b4e09787fc4f",
							"name": "Trap",
							"createdAt": "2020-05-21T22:08:16.414Z",
							"updatedAt": "2020-05-21T22:08:16.414Z"
					}
			]
	},
	currentOrganization: {
		"id": 1,
		"uuid": "989713f3-2f0b-4a14-b863-d98b5c00f94e",
		"name": "Fregalo",
		"reputation": 9,
		"description": "\n          Normal fregal Sergeevich. Sounds honorable, looks stylish. Here, only fucked up in the head anime. Who are willing to sell their mother for ramen and a point for the opportunity to see waifa.\n          If you're not like that, just walk through and leave us alone. We don't touch you, don't touch us. Trust me, you'll be better off. We're fucked up tight, we can fuck you in all the holes if you just mention anime in our presence.\n        ",
		"logo": "fregalo.jpg",
		"createdAt": "2020-05-21T22:08:16.398Z",
		"updatedAt": "2020-05-21T22:08:16.398Z"
	},
});


export const mutations = {
	SET_TAGS: (state, tags) => {
		state.tags = tags || [];
	},
	SET_EVENTS: (state, events) => {
		state.events = events || [];
	},

	SET_CURRENT_EVENT: (state, event) => {
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

	async requestEventInfo({ commit }, uuid) {
		let { event = null, message = null } = (await GeneralService.requestEventInfo(uuid)).data;
		return event ? commit('SET_CURRENT_EVENT', event) : message;
	},

	async requestOrganizationInfo({ commit }, uuid) {
		let { organization = null, message = null } = (await GeneralService.requestOrganizationInfo(uuid)).data;
		return event ? commit('SET_CURRENT_ORGANIZATIOB', organization) : message;
	},

	resetCurrentEvent({ commit }) {
		commit('RESET_CURRENT_EVENT');
	},

	resetCurrentOrganization({ commit }) {
		commit('RESET_CURRENT_ORGANIZATION');
	},

	changePassword({ getters } , { password }) {
		
	},
};

export const getters = {
	getAllTags: state => state.tags,
	getEvents: state => state.events,
	getCurrentEvent: state => state.currentEvent,
	getCurrentOrganization: state => state.currentOrganization,
};
