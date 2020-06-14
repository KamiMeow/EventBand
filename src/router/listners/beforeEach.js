import webClient from '@/middleware/WebClient';

const NOT_LOGIN_META = 'notLogin';
const NEED_LOGIN_META = 'needLogin';
const NEED_ORG_LOGIN_META = 'needOrgLogin';
const FOR_ALL_META = 'all';

const lastRouteTo = {};
const lastRouteFrom = {};

function isEmpty(object) {
  return !Object.keys(object).length;
};

export default function (store) {
  return (to, from, next) => {
		const isLogged = store.getters['auth/getIsLogged'];
		const isOrgLogged = store.getters['auth/getIsLoggedAsOrganization'];
    const token = store.getters['auth/getToken'];
		const organizationToken = store.getters['auth/getOrganizationToken'];
			
    if (organizationToken || token) {
			webClient.login(organizationToken || token);
		}

		

    const isPing = !!(to.path === '/ping' && lastRouteTo);
		const { meta:   { access }, path } = isPing ? lastRouteTo : to;


		if ((isEmpty(lastRouteTo) && to.name === 'sign-in') || to.name !== 'sign-in') {
			Object.assign(lastRouteTo, to); 
			Object.assign(lastRouteFrom, from);
		}
    if (!isLogged && (access === NEED_LOGIN_META || access === NEED_ORG_LOGIN_META)) {
      return next('/login');
    }
    else if (isLogged && access === NOT_LOGIN_META) {
      return next('/');
		} 
		else if (!isOrgLogged && isLogged && access === NEED_ORG_LOGIN_META) {
			return next('/profile');
		}
		else if (isOrgLogged && (access !== NEED_ORG_LOGIN_META)) {
			return next('/my-organization/info');
		}
		
    return next((isPing && path) || true);
  };
};
