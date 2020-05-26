import webClient from '@/middleware/WebClient';

const NOT_LOGIN_META = 'notLogin';
const NEED_LOGIN_META = 'needLogin';
const FOR_ALL_META = 'all';

const lastRoute = {};

function isEmpty(object) {
  return !Object.keys(object).length;
};

export default function (store) {
  return (to, _, next) => {
    const isLogged = store.getters['auth/getIsLogged'];
    const token = store.getters['auth/getToken'];
		const organizationToken = store.getters['auth/getOrganizationToken'];
		
		// console.log(organizationToken);
		
    if (organizationToken || token) {
      webClient.login(organizationToken || token);
    }

    const isPing = !!(to.path === '/ping' && lastRoute);
    const { meta:   { access }, path } = isPing ? lastRoute : to;

    if ((isEmpty(lastRoute) && to.name === 'sign-in') || to.name !== 'sign-in') Object.assign(lastRoute, to);
    if (!isLogged && access === NEED_LOGIN_META) {
      return next('/login');
    }
    else if (isLogged && access === NOT_LOGIN_META) {
      return next('/');
    }

    return next((isPing && path) || true);
  };
};
