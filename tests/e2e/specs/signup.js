describe('Регистрация нового пользователя', () => {
	it('Переход на страницу регистрации', () => {
		cy.visit('/sign-up');
	});
	
	it('Ввод почты пользователя', () => {
		cy.get('#input-42')
			.type('test'+  Math.floor(Math.random() * Math.floor(1000)) +'@test.com');
	});

	it('Ввод Фамилии пользователя', () => {
		cy.get('#input-46')
			.type('MySurname');
	});

	it('Ввод Имени пользователя', () => {
		cy.get('#input-50')
			.type('MyName');
	});

	it('Ввод Никнейма пользователя', () => {
		cy.get('#input-54')
			.type('GrassBoy-Unique');
	});

	it('Ввод Пароля пользователя', () => {
		cy.get('#input-58')
			.type('newpasss');
	});

	it('Подтверждение регистрации', () => {
		cy.get('.row > .col > .white--text')
			.focus()
			.click();
	});
});

describe('Проваленная регистрация нового пользователя', () => {
	it('Переход на страницу регистрации', () => {
		cy.visit('/sign-up');
	});
	
	it('Ввод почты пользователя', () => {
		cy.get('#input-42')
			.type('test@test.com');
	});

	it('Ввод Фамилии пользователя', () => {
		cy.get('#input-46')
			.type('MySurname');
	});

	it('Ввод Имени пользователя', () => {
		cy.get('#input-50')
			.type('MyName');
	});

	it('Ввод Никнейма пользователя', () => {
		cy.get('#input-54')
			.type('GrassBoy-Unique');
	});

	it('Ввод Пароля пользователя', () => {
		cy.get('#input-58')
			.type('newpasss');
	});

	it('Подтверждение регистрации', () => {
		cy.get('.row > .col > .white--text')
			.focus()
			.click();
	});
});