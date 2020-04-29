import services from '@/middleware'; 
const { UserService } = services;
 
export const initialState = () => ({
	isLogged: false,
	email: '',
	nickname: '',
	surname: '',
	name: '',
	password: '',
});

export const mutations = {
	SIGN_IN: (state, user) => {
		state.isLogged = true;
		state.email = user.email;
		state.nickname = user.nickname;
		state.surname = user.surname;
		state.name = user.name;
	},
}

export const actions = {
	async signIn({ commit }, { email, password } ) {
		const { user } = (await UserService.signIn( email, password )).data;
		commit('SIGN_IN', user);
	},
};

export const getters = {

	getUser: state => ({ 
		email: state.email,
		nickname: state.nickname,
		surname: state.surname,  
		name: state.name,  
	}),
	
	getIsLogged: state => state.isLogged,

};