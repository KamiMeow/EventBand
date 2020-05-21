import Vue from 'vue'
import App from './App.vue'
import routerInit from './router';
import store from './store'
import vuetify from './plugins/vuetify';

import WebClient from './middleware/WebClient';
import RStore from './helper/RStore';

Vue.config.productionTip = false
const router = routerInit(store);

WebClient.$router = router;
WebClient.$store = store;

RStore.subscribe('afterUpdate', state => {
  store.dispatch(state ? 'auth/loginFromState' : 'unsetUserData', state);
  router.replace('/ping');
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
