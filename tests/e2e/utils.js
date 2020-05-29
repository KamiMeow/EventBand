export const visit =
  () => cy.visit('/');

export const getRouter =
  () => cy.window()
  .its('app')
  .its('$router');

export const getStore =
  () => cy.window()
    .its('app')
    .its('$store');

export const getStoreModule =
  module => getStore()
    .its('state')
    .its(module);

export const shouldIncludeLink =
  link => cy
    .url()
    .should('include', link);

export const findElementOn =
  (element, query) => cy
    .get(query)
    .find(element);

export function auth(
  login = 'demo.agency@vdooh.com',
  password = '123123123',
  CLIENTID = 'CYPRESS',
  client_name = 'Cypress bot',
) {
  return (() => {
    getStore()
      .then(async store => {
        const { data } = await store.dispatch('auth/login', { login, password });

        const user_data = {
          user_name: data.user_name,
          USERID: data.USERID,
          n_id: data.n_id,
        };

        await store.dispatch('auth/loginAsClient', { client: CLIENTID, name: client_name });
        store.dispatch('auth/setCurrentUser', user_data);

        store.dispatch('auth/setInAgency', false);
        routeTo({ name: 'translations.all' });
    
        store.dispatch('menu/refreshMenu', store);
      })
  })();
};

export function routeTo(config, isReplace = false) {
  return getRouter()
    .then(router => {
      return isReplace
        ? router.replace(config)
        : router.push(config);
    });
};
