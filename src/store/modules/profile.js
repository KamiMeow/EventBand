import services from '@/middleware'
const { ProfileService } = services;

const initialUser = () => ({
	email: 'example@example.com',
	nickname: 'example-nickname',
	avatar: '/alien.svg', 
	surname: 'Brown',
	name: 'John',
});

export const initialState = () => ({
	actualUser: initialUser(),
	editableUser: initialUser(),
	organizations: [],
});

export const mutations = {
	SIGN_IN: (state, user) => {
		state.actualUser.email = state.editableUser.email = user.email;
		state.actualUser.nickname = state.editableUser.nickname = user.nickname;
		state.actualUser.surname = state.editableUser.surname = user.surname;
		state.actualUser.name = state.editableUser.name = user.name;
		state.actualUser.avatar = state.editableUser.avatar = user.avatar; 
	},

	UNSET_EDITABLE_USER: (state) => {
		state.editableUser = { ...state.actualUser };
	},

	SET_ACTUAL_USER: (state, user) => {
		state.actualUser = { ...user };
	},

	PUSH_NEW_ORGANIZATION: (state, organization) => {		
		state.organizations.push(organization);
	},

	SET_ORGANIZATIONS_LIST: (state, list) => {
		state.organizations = list;		
	},
};

export const actions = {
	unsetEditableUser({ commit }) {
		commit('UNSET_EDITABLE_USER');
	},

	async setActualUser({ commit }, user) {
		let response = (await ProfileService.updateProfileInfo({
			nickname: user.nickname,
			email: user.email,
			surname: user.surname,
			name: user.name,
		})).data;

		console.log(response);
		
		if (response.message !== undefined) {
			commit('UNSET_EDITABLE_USER');
			return { message: response.message, };
		} else {
			commit('SET_ACTUAL_USER', response.user);
		}
	},

	async getProfile({ commit }) {
		let resp = (await ProfileService.getProfileInfo()).data;
		console.log(resp);
	
		commit('SET_ORGANIZATIONS_LIST', resp.organizations);
	},

}; 

export const getters = {
	getActualUser: state => state.actualUser,
	getEditableUser: state => state.editableUser,
	getUserOrganizations: state => state.organizations,
};

