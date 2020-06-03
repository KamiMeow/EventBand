import VueX from 'vuex';
import storeVueX from '@/store';
import {
	createLocalVue
} from "@vue/test-utils";

const localVue = createLocalVue();
localVue.use(VueX);

export default storeVueX;