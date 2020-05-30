import services from '@/middleware'; 
const { UserService, GeneralService } = services;

export const initialState = () => ({
	isLogged: false,
	isLoggedAsOrganization: false,
	organizationToken: '',
	organizationUuid: '',
	token: '', 
	uuid: '', 
});

export const mutations = {
	
	SET_AUTH_INFO: (state, { uuid, token }) => {
		state.isLogged = true;
		state.token = token;
		state.uuid = uuid;
	},
	LOGOUT: state => {
		state.isLogged = false;
		state.token = '';
		state.uuid = '';
	},

	LOGOUT_AS_ORG: state => {
		state.isLoggedAsOrganization = false;
		state.organizationToken = '';
	},

	SET_AUTH_ORG_INFO: (state, { token, uuid }) => {
		state.isLoggedAsOrganization = true;
		state.organizationToken = token;
		state.organizationUuid = uuid;
	},

};

export const actions = {
	
	loginFromState: ({ commit }, data) => { 
		commit('SET_AUTH_INFO', data);
		if (data.organizationToken) {
			commit('SET_AUTH_ORG_INFO', {token: data.organizationToken, uuid: data.organizationUuid,});
		}
	},

	logout: ({ dispatch }) => dispatch('unsetUserData', null, { root: true }),

	logoutAsOrganization: ({ commit, dispatch, state }) => {

		commit('LOGOUT_AS_ORG');
		const infoUser = {
			token: state.token,
			uuid: state.uuid,
			organizationToken: undefined,
		};
		dispatch('saveToLocaleStorage', infoUser, { root: true });
	},

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
	
	async signUp({ dispatch, commit, state }, userInfo ) {
		// GeneralService.checkForEmailExistance();
		// return;
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

	signInAsOrganization({dispatch, commit, getters}, { token, uuid }) {
		
		commit('SET_AUTH_ORG_INFO', {token, uuid});
		dispatch('saveToLocaleStorage', getters.getDataForLocalStorage, { root: true });
	},
	
};

export const getters = {

	getIsLogged: state => state.isLogged,
	getUUID: state => state.uuid,
	getToken: state => state.token,
	getIsLoggedAsOrganization: state => state.isLoggedAsOrganization,
	getOrganizationToken: state => state.organizationToken,
	getOrganizationUuid: state => state.organizationUuid,
	getDataForLocalStorage: state => ({
		uuid: state.uuid,
		token: state.token,
		organizationToken: state.organizationToken,
		organizationUuid: state.organizationUuid,
	}),

};