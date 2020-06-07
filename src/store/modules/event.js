// TODO set comments
import services from '@/middleware';
const { EventService } = services;

/**
 * Инициализирует изначальное состояние модуля
 */
export const initialState = () => ({
	createdTickets: [],
});


export const mutations = {

	/**
	 * Добавляет новый билет в массив билетов мероприятия
	 */
	ADD_CREATED_TICKET: (state, ticket) => {
		state.createdTickets.push(ticket);
		console.log(ticket);
	},

	/**
	 * Удаляет билет из массива билетов мероприятия
	 */
	REMOVE_TICKET: (state, ticket) => {
		delete ticket.from;
		delete ticket.to;
		state.createdTickets.splice(state.createdTickets.indexOf(ticket), 1);
	},
	
	/**
	 * Очищает массив билетов 
	 */
	UNSET_EVENT_INFO: (state) => {
		state.createdTickets.splice(0, state.createdTickets.length);
	},
};

export const actions = {
	/**
	 * 
	 * @param {Object} vuex 
	 * @param {*} ticket 
	 */
	async createTicket({ commit, state }, ticket ) {
		let res = (await EventService.createTicket(ticket)).data;
		commit('ADD_CREATED_TICKET', res.ticket);
		// console.log(state.createdTickets);
	},

	async removeTicket({ commit }, ticket) {		
		await EventService.removeTicket(ticket.uuid);
		commit('REMOVE_TICKET', ticket); 
	},

	async createEvent({ commit }, event) {
		let response = (await EventService.createEvent(event)).data;
		console.log(response);
		
		commit('UNSET_EVENT_INFO');
	},

	async subscribeOnEvent(_, uuid) {
		let response = await EventService.subscribeOnEvent(uuid);
		return response.status < 400 ? {
			message: response.data.message,
			type: 'success',
		} : {
			message: response.data.message,
			type: 'error',
		};
	},

};

export const getters = {
	/**
	 * Возвращает созданные билеты для мероприятия
	 */
	getCreatedTickets: state => state.createdTickets,
};


