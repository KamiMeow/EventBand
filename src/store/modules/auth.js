import services from '@/middleware'; 
const { UserService } = services;

export const initialState = () => ({
	isLogged: false,
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
	}

};

export const actions = {
	loginFromState: ({ commit }, data) => commit('SET_AUTH_INFO', data),
	logout: ({ dispatch }) => dispatch('unsetUserData', null, { root: true }),

	async signIn({ commit, dispatch }, { email, password } ) {
		const { user, message } = await UserService.signIn( email, password );
		if (!user) {
			return message
				? { message }
				: { message: 'Something went wrong' };
		}
		const infoUser = {
			token: user.token,
			uuid: user.uuid,
		};

		commit('SET_AUTH_INFO', infoUser);
		dispatch('saveToLocaleStorage', infoUser, { root: true });
			
	},

	async signUp({ dispatch, commit }, userInfo ) {
		const { user = null, message = null } = (await UserService.signUp( userInfo )).data;
		if (user) {
			const infoUser = {
				token: user.token,
				uuid: user.uuid,
			};
			commit('profile/SIGN_IN', user, { root: true });
			dispatch('saveToLocaleStorage', infoUser, { root: true });
	
			commit('SET_AUTH_INFO', infoUser);

			return {};
		} else {
			return { message };
		}
	},

	
};

export const getters = {

	getIsLogged: state => state.isLogged,
	getUUID: state => state.uuid,
	getToken: state => state.token,

};