describe('Регистрация нового пользователя', () => {
	it('Переход на страницу регистрации', () => {
		cy.visit('/sign-up');
	});
	
	it('Ввод почты пользователя', () => {
		cy.get('#input-32')
			.type('test'+  Math.floor(Math.random() * Math.floor(1000)) +'@test.com');
	});

	it('Ввод Фамилии пользователя', () => {
		cy.get('#input-36')
			.type('MySurname');
	});

	it('Ввод Имени пользователя', () => {
		cy.get('#input-40')
			.type('MyName');
	});

	it('Ввод Никнейма пользователя', () => {
		cy.get('#input-44')
			.type('GrassBoy-Unique');
	});

	it('Ввод Пароля пользователя', () => {
		cy.get('#input-48')
			.type('newpasss');
	});

	it('Подтверждение регистрации', () => {
		cy.get('.white--text')
			.focus()
			.click();
	});
});

describe('Проваленная регистрация нового пользователя', () => {
	it('Переход на страницу регистрации', () => {
		cy.visit('/sign-up');
	});
	
	it('Ввод почты пользователя', () => {
		cy.get('#input-32')
			.type('test@test.com');
	});

	it('Ввод Фамилии пользователя', () => {
		cy.get('#input-36')
			.type('MySurname');
	});

	it('Ввод Имени пользователя', () => {
		cy.get('#input-40')
			.type('MyName');
	});

	it('Ввод Никнейма пользователя', () => {
		cy.get('#input-44')
			.type('GrassBoy-Unique');
	});

	it('Ввод Пароля пользователя', () => {
		cy.get('#input-48')
			.type('newpasss');
	});

	it('Подтверждение регистрации', () => {
		cy.get('.white--text')
			.focus()
			.click();
	});
});