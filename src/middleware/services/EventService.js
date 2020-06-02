
export default {
		/**
		 * Метод создания мероприятия
		 * @param {Object} event
		 * @param {String} event.name - Название мероприятия
		 * @param {String} event.description - Описание мероприятия
		 * @param {String} event.coords - Координаты мероприятия
		 * @param {Date} event.datetimeFrom - Дата / время начала мероприятия
		 * @param {Date} event.datetimeTo - Дата / время окончания мероприятия
		 * @param {Number} event.count - Суммарное количество билетов
		 * @param {Array} event.tags - Теги мероприятия
		 * @param {Array} event.tickets - Билеты мероприятия
		 * @returns {Promise} promise
		 */
		createEvent(event) {
			return this.apiClient.post('my-organization/event/create', { ...event });
		},
		
		/**
		 * Метод для запроса на создание билета
		 * @param {Object} ticket 
		 * @param {String} ticket.name - Название билета
		 * @param {String} ticket.description - Описание билета
		 * @param {Number} ticket.count - Количество билетов
		 * @param {Number} ticket.price - Цена одного билета
		 * @param {Date} ticket.datetimeFrom - Дата начала действия билета
		 * @param {Date} ticket.datetimeTo - Дата окончания действия билета
		 * @returns {Promise} promise
		 */
		createTicket( ticket ) {			
			return this.apiClient.post('my-organization/ticket/create', ticket);
		},
		
		/**
		 * Метод для запроса на удаление билета
		 * @param {String} uuid - uuid удаляемого билета
		 * @returns {Promise} promise
		 */
		removeTicket( uuid ) {
			return this.apiClient.delete(`my-organization/ticket/${uuid}`);
		},
		
		/**
		 * Метод для запроса на подписку на мероприятие
		 * @param {String} uuid - uuid Мероприятия(билета), на которое подписывается пользователь
		 * @returns {Promise} promise
		 */
		subscribeOnEvent(uuid) {
			return this.apiClient.get(`event/subscribe/${uuid}`);
		},
}