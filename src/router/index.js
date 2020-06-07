/**
 * Модуль роутера приложения
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import initListners from './initListners';
import listners from './listners';

import unloggedRoutes from "./routes/unloggedRoutes";
import loggedRoutes from "./routes/loggedRoutes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
		component: () => import('@/views/MainPage'),
	},
	{
		path: "/create-new-password/:token",
		component: () => import('@/views/CreateNewPasswordForm'),
	},

  ...unloggedRoutes,
  ...loggedRoutes,

  {
    path: '/ping',
    name: 'ping',
  },
  {
    path: "/*",
    redirect: '/sign-in',
	},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default initListners(router, listners);
