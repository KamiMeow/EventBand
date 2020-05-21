import services from '@/middleware'; 
const { UserService } = services;

export const initialState = () => ({
	isLogged: false,
	token: '', 
	uuid: '', 
});

export const mutations = {

	SET_AUTH_INFO: (state, { uuid, token }) => {
		state.token = token;
		state.uuid = uuid;
	},

}

export const actions = {
	async signIn({ commit, dispatch }, { email, password } ) {
		const response = await UserService.signIn( email, password );		
		return response.message ? { message: response.message } : dispatch('profile/getProfile', null, { root: true }); 
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