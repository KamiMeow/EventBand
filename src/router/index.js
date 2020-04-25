/**
 * Модуль роутера приложения
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import initListners from './initListners';
import listners from './listners';
import unloggedRoutes from "./routes/unloggedRoutes";
import loggedRoutes from "./routes/loggedRoutes";

Vue.use(VueRouter)

const routes = [
  ...unloggedRoutes,
  ...loggedRoutes,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default initListners(router, listners);
