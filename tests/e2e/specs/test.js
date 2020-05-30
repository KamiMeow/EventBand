// https://docs.cypress.io/api/introduction/api.html

// import { visit } from "../utils";


describe('Тестирование переходов по страницам', () => {
  it('Переход на главную страницу', () => {
		// visit();
		cy.visit('/');
	});
	
	it('Переход на страницу регистрации', () => {
		cy.visit('/sign-up');
	});
	
	it('Переход на страницу авторизации', () => {
		cy.visit('/sign-in');
	});

	it('Переход на страницу поиска мепроприятий', () => {
		cy.visit('/events/list');
	})
})
