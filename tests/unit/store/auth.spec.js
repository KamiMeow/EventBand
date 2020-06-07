	import store from './store';

	const path = 'auth/';

	describe('Модуль AUTH', () => {
		
		it('Islogged - false', () => {
			expect(store.getters[`${path}getIsLogged`]).toBe(false);
		});

		it('IsLoggedAsOrganization - false', () => {
			expect(store.getters[`${path}getToken`]).toBe('');
		});
		
		it('UUID Пользователя - Отсутствует', () => {
			store.dispatch(`${path}logout`);
			expect(store.getters[`${path}getUUID`]).toBe('');
		});

		it('Token Пользователя - Отсутствует', () => {
			expect(store.getters[`${path}getToken`]).toBe('');
		});

		it('Token Организации пользователя - Отсутствует', () => {
			expect(store.getters[`${path}getOrganizationToken`]).toBe('');
		});

		it('UUID Организации пользователя - Отсутствует', () => {
			expect(store.getters[`${path}getOrganizationUuid`]).toBe('');
		});	
		
		// ---------------------------------------
		it('IsLogged - true', async () => {
			await store.dispatch(`${path}signIn`, {
				email: 'test@test.com',
				password: 'test',
			});
			expect(store.getters[`${path}getIsLogged`]).toBeTruthy();
		});

		it('UUID Пользователя - получен', () => {
			expect(store.getters[`${path}getUUID`].length).toBeGreaterThan(0);
		});
		
		it('Token Пользователя - получен', () => {
			expect(store.getters[`${path}getToken`].length).toBeGreaterThan(0);
		});
		
	});