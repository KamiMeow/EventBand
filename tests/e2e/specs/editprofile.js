describe('Изменение данных пользователя', () => {
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

	it('Отправка запроса на авторизацию', () => {
		cy.get('.v-card__actions > .row > .null-indents > .v-btn')
			.focus()
			.click();
	});

	it('Открытие формы изменения профиля', () => {
		cy.get('.pl-8 > :nth-child(3) > .v-btn')
			.focus()
			.click();

		cy.get('#input-129')
		.focus()
		.clear()
		.type('some-nick');

		cy.get('#input-132')
		.focus()
		.clear()
		.type('some-sur');

		cy.get('#input-135')
		.focus()
		.clear()
		.type('some-name');

		cy.get('.error')
			.focus()
			.click();
		
			cy.get('.pl-8 > :nth-child(3) > .v-btn')
			.focus()
			.click();

			cy.get('#input-129')
		.focus()
		.clear()
		.type('jelly');

		cy.get('#input-132')
		.focus()
		.clear()
		.type('belly');

		cy.get('#input-135')
		.focus()
		.clear()
		.type('john');

		cy.get('.success')
			.focus()
			.click();
	});

});

