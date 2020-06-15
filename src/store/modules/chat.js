//TODO set comments
import services from '@/middleware';
const { ChatService } = services;

export const initialState = () => ({
	messages: [],
	
});

export const mutations = {
	SET_MESSAGES: (state, messages) => {
		state.messages.splice(0, state.messages.length);
		state.messages = messages;
	},
};

export const actions = {
	async getPreviousMessages({ commit }, chatUuid) {
		let { messages = [] } = (await ChatService.getPreviousMessages(chatUuid)).data;
		commit('SET_MESSAGES', messages);
	},
};

export const getters = {
	getMessages: state => state.messages,
};