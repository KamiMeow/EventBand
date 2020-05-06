import services from '@/middleware'; 
const { UserService } = services;
 
const initialUser = () => ({
	email: 'example@gmail.com',
	nickname: 'example-nickname',
	surname: 'Brown',
	name: 'John',
	password: 'password123',
});

export const initialState = () => ({
	isLogged: false,
	actualUser: initialUser(),
	editableUser: initialUser(),
});

export const mutations = {
	SIGN_IN: (state, user) => {
		state.isLogged = true;
		state.actualUser.email = state.editableUser.email = user.email;
		state.actualUser.nickname = state.editableUser.nickname = user.nickname;
		state.actualUser.surname = state.editableUser.surname = user.surname;
		state.actualUser.name = state.editableUser.name = user.name;
	},

	UNSET_EDITABLE_USER: (state) => {
		state.editableUser = { ...state.actualUser };
	},

	SET_ACTUAL_USER: (state, user) => {
		state.actualUser = { ...user };
	},
}

export const actions = {
	async signIn({ commit }, { email, password } ) {
		const { user } = (await UserService.signIn( email, password )).data;
		commit('SIGN_IN', user);
	},

	unsetEditableUser:  ({ commit }) => {
		commit('UNSET_EDITABLE_USER');
	},

	setActualUser({ commit }, user) {
		commit('SET_ACTUAL_USER', user);
	}
};

export const getters = {

	getActualUser: state => state.actualUser,
	getEditableUser: state => state.editableUser,
	
	getIsLogged: state => state.isLogged,

};