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
    const isSigned = store.getters['auth/getIsSigned'];
    const token = store.getters['auth/getToken'];

    const { access } = to.meta;

    if (token) {
      webClient.login(token);
    }

    console.log(to.meta, isSigned, access);
    if (!access || access === FOR_ALL_META) next();
    if (isSigned) {
      if (access === NEED_LOGIN_META) next();
      else if (access === NOT_LOGIN_META) next('/');
    }
    else {
      if (access === NEED_LOGIN_META) next('/sign-in');
      else if (access === NOT_LOGIN_META) next();
    }

    next();
  };
};
