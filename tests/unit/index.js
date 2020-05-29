import Vue from 'vue'
import VueX from 'vuex';
import Vuetify from 'vuetify';
import storeVueX from '@/store';
import LocaleStorageMock from './LocaleStorageMock';
import {
  mount as globalMount,
  shallowMount as globalShallowMount,
  createLocalVue,
} from "@vue/test-utils";


const localVue = createLocalVue();
window.localStorage = LocaleStorageMock;

Vue.use(Vuetify);
localVue.use(VueX);
localVue.use(Vuetify);

const initMountConfig = (config = { store: false }) => {
  if (config.store) {
    config.store.getters = {
      ...config.store.getters,
      getRules: () => storeVueX.getters['getRules'],
    }
  }

  return {
    ...config,
    store: config.store ? new VueX.Store(config.store) : storeVueX,
    vuetify: new Vuetify(),
    localVue,
  };
};

export const mount = (component, config = { store: false }) =>
  globalMount(component, initMountConfig(config));

export const shallowMount = (component, config = { store: false }) =>
  globalShallowMount(component, initMountConfig(config));
