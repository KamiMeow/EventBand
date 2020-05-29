/**
 * Модуль хранилища
 */

import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import initialModules from './initialModules';
import RStore from '../helper/RStore';
import WebClient from '../middleware/WebClient';
import GeneralService from '../middleware/services/GeneralService';

Vue.use(Vuex);

/**
 * Первичное состояние.
 * Вынесено в отдельную функцию, для быстрого возврата в начальное состояние
 */
const initialState = () => ({
  // Правила для валидации полей формы
  rules: {
		
    required: v => {
      const value = (typeof v === 'number') ? v.toString() : v;
      return (!!value && !!value.length) || 'Field is required';
		},
		
    range: ({ min, max }) => {
      return value => {
        if (!Number.isInteger(+value)) return 'Value must be a number';
        if (value < min) return 'Value must be greater than' + min;
        return value <= max || 'Value must be less than ' + max;
      }
		},
		
    email: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || 'Incorrect E-mail'
		},
		
    min: type => {
      const message = 'Not enough characters';
      switch(type) {
        case 'phone':
          return v => (v + '').length === 18 || message;
				case 'password': 
					return v => (v + '').length >= 3 || message;
				case 'nickname': 
					return v => (v + '').length >= 3 || message;
				case 'surname': 
					return v => (v + '').length >= 3 || message;
				case 'name': 
					return v => (v + '').length >= 3 || message;
				case 'event-name':
					return v => (v + '').length >= 5 || message;
				case 'event-description': 
					return v => (v + '').length >= 10 || message;

        default:
          return true;
      };
    }
  },
});


const vuex = new Vuex.Store({
  state: initialState,
  mutations: {
    UNSET_DATA: state => state = initialState(),
  },
  actions: {
    saveToLocaleStorage(_, data) {
      RStore.initState(data);
    },
    unsetUserData({ commit, dispatch }) {
      Object.keys(modules).forEach(module => {
        commit(`${module}/UNSET_DATA`);
      });
      commit('UNSET_DATA');
      dispatch('saveToLocaleStorage');
			WebClient.logout();
		},
		
		async changePassword(_, { password, token }) {
			let message = await GeneralService.changePassword({ password, token });
			return message ? message : undefined;
		},
	},
  getters: {
		getRules: state => state.rules,
		
  },
  modules: initialModules(modules),
});

export default vuex;
