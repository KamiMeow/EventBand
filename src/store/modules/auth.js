// TODO set comments
import services from '@/middleware'; 
const { UserService, GeneralService } = services;
/**
 * Изначальное состояние хранилища
 */
export const initialState = () => ({
	isLogged: false,
	isLoggedAsOrganization: false,
	organizationToken: '',
	organizationUuid: '',
	token: '', 
	uuid: '', 
});

export const mutations = {
	
	/**
	 * Назначает аутентификационную информацию
	 */
	SET_AUTH_INFO: (state, { uuid, token }) => {
		state.isLogged = true;
		state.token = token;
		state.uuid = uuid;
	},
	/**
	 * Очищает аутентификационную информацию
	 */
	LOGOUT: state => {
		state.isLogged = false;
		state.token = '';
		state.uuid = '';
	},
	
	/**
	 * Очищает аутентификационную информацию об организации
	 */
	LOGOUT_AS_ORG: state => {
		state.isLoggedAsOrganization = false;
		state.organizationToken = '';
	},

	/**
	 * Назначает аутентификационную информацию об организации
	 */
	SET_AUTH_ORG_INFO: (state, { token, uuid }) => {
		state.isLoggedAsOrganization = true;
		state.organizationToken = token;
		state.organizationUuid = uuid;
	},

};

export const actions = {
	
	/**
	 * Логин из локального хранилища
	 */
	loginFromState: ({ commit }, data) => { 
		commit('SET_AUTH_INFO', data);
		if (data.organizationToken) {
			commit('SET_AUTH_ORG_INFO', {token: data.organizationToken, uuid: data.organizationUuid,});
		}
	},

	/**
	 * Удаление данных из локального хранилища
	 */
	logout: ({ dispatch }) => dispatch('unsetUserData', null, { root: true }),

	/**
	 * Удаление данных об организации из локального хранилища
	 */
	logoutAsOrganization: ({ commit, dispatch, state }) => {

		commit('LOGOUT_AS_ORG');
		const infoUser = {
			token: state.token,
			uuid: state.uuid,
			organizationToken: undefined,
		};
		dispatch('saveToLocaleStorage', infoUser, { root: true });
	},

	/**
	 * Авторизация
	 * @param {Object} vuex 
	 * @param {Object} userInfo 
	 */
	async signIn({ commit, dispatch, state }, { email, password } ) {
		const { user, message } = await UserService.signIn( email, password );
		if (!user) {
			return message
				? { message }
				: { message: 'Something went wrong' };
		}
		const infoUser = {
			token: user.token,
			uuid: user.uuid,
			organizationToken: state.organizationToken,
		};

		commit('profile/SIGN_IN', user, { root: true });
		commit('SET_AUTH_INFO', infoUser);
		dispatch('saveToLocaleStorage', infoUser, { root: true });
			
	},
	
	/**
	 * Регистрация нового пользователя
	 * @param {Object} vuex 
	 * @param {Object} userInfo - Информация о новом пользователе
	 */
	async signUp({ dispatch, commit, state }, userInfo ) {
		const { user = null, message = null } = (await UserService.signUp( userInfo )).data;
		if (user) {
			const infoUser = {
				token: user.token,
				uuid: user.uuid,
				organizationToken: state.organizationToken,
			};
			commit('profile/SIGN_IN', user, { root: true });
			commit('SET_AUTH_INFO', infoUser);
			dispatch('saveToLocaleStorage', infoUser, { root: true });
			
			return {};
		} else {
			return { message };
		}
	},

	/**
	 * Аутентификация за организацию
	 * @param {Object} vuex 
	 * @param {Object} orgInfo 
	 */
	signInAsOrganization({dispatch, commit, getters}, { token, uuid }) {
		
		commit('SET_AUTH_ORG_INFO', {token, uuid});
		dispatch('saveToLocaleStorage', getters.getDataForLocalStorage, { root: true });
	},

	/**
	 * Проверка почты на существование
	 * @param {Object} vuex 
	 * @param {String} email 
	 */
	async verifyEmail(_, email) {
		let res = await GeneralService.checkForEmailExistance(email);
		// console.log('AUTH', res);
		return res;
		
	},
	
	
};

export const getters = {

	/**
	 * Возвращает значение залогинен пользователь или нет
	 */
	getIsLogged: state => state.isLogged,
	/**
	 * Возвращает UUID пользователя
	 */
	getUUID: state => state.uuid,
	/**
	 * Возвращает токен пользователя
	 */
	getToken: state => state.token,
	/**
	 * Возвращает значение пользователь в роли организации или нет
	 */
	getIsLoggedAsOrganization: state => state.isLoggedAsOrganization,
	/**
	 * Возвращает токен организации
	 */
	getOrganizationToken: state => state.organizationToken,
	/**
	 * Возвращает UUID текущей организации
	 */
	getOrganizationUuid: state => state.organizationUuid,
	/**
	 * Возвращает необходимые данные для сохранения в локальное хранилище
	 */
	getDataForLocalStorage: state => ({
		uuid: state.uuid,
		token: state.token,
		organizationToken: state.organizationToken,
		organizationUuid: state.organizationUuid,
	}),

};