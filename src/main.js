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

const settings = {
  apiKey: '8f4217b3-fd58-486f-aff3-301ef4343996',
  lang: 'en_EN',
  coordorder: 'latlong',
  version: '2.1'
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
