describe('Авторизация за пользователя', () => {
	it('Переход на страницу авторизации', () => {
		cy.visit('/sign-in');
	});

	it('Ввод почты', () => {
		cy.get('#input-42')
			.type('test@test.com')
	});

	it('Ввод пароля', () => {
		cy.get('#input-46')
			.type('test');
	});

	it('Отправка за проса на авторизацию', () => {
		cy.get('.v-card__actions > .row > .null-indents > .v-btn')
			.focus()
			.click();
	});
});

describe('Случай с проваленной аутентификацией', () => {
	it('Переход на страницу авторизации', () => {
		cy.visit('/sign-in');
	});

	it('Ввод почты', () => {
		cy.get('#input-42')
			.type('test@test.com')
	});

	it('Ввод пароля', () => {
		cy.get('#input-46')
			.type('test-no-access');
	});

	it('Отправка за проса на авторизацию', () => {
		cy.get('.v-card__actions > .row > .null-indents > .v-btn')
			.focus()
			.click();
	});
});