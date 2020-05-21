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
	logout: ({ commit }) => commit('LOGOUT'),

	async signIn({ commit, dispatch }, { email, password } ) {
		const { user, message } = await UserService.signIn( email, password );
		commit('SET_AUTH_INFO', {
			token: user.token,
			uuid: user.uuid,
		});

		return message
			? { message }
			: dispatch('profile/getProfile', null, { root: true });
	},

	async signUp({ commit }, userInfo ) {
		const { user = null, message = null } = (await UserService.signUp( userInfo )).data;
		if (user) {
			commit('SET_AUTH_INFO', { 
				uuid: user.uuid, 
				token: user.token,
			});
			commit('profile/SIGN_IN', user, { root: true });
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