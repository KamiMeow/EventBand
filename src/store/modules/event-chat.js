import services from "@/middleware";
const { ChatService } = services;
 
export const initialState = () => ({
	messages: [],
	chatUuid: '',
});

export const mutations = {
	SET_MESSAGES: (state, messages) => {
		state.messages = messages;
	},

	SET_CHAT: (state, uuid) => {
		state.chatUuid = uuid;
	},

	UNSET_MESSAGES: (state) => {
		state.messages.splice(0, state.messages.length);
	},
};

export const actions = {
	async requestChatMessages({ commit, getters }) {
		let { messages = [] } = (await ChatService.getPreviousMessages(getters['getChatUuid'])).data;
		commit('SET_MESSAGES', messages);
	},

	async removeMessage({ commit, dispatch, getters }, messageUuid ) {
		await ChatService.removeMessage(getters['getChatUuid'], messageUuid);
		commit('UNSET_MESSAGES');
		dispatch('requestChatMessages', getters['getChatUuid']);
	},

	setChatUuid({ commit }, chatUuid) {
		commit('SET_CHAT', chatUuid);
	},
};

export const getters = {
	getChatMessages: state => state.messages,
	getChatUuid: state => state.chatUuid,
};