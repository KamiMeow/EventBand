import store from './store';

const path = 'nonauth/';

describe('Модуль NON-AUTH', () => {

	it('Tags - пустой массив', () => {
		expect(store.getters[`${path}getAllTags`].length).toBeGreaterThanOrEqual(0);
	});

	it('Events - пустой массив', () => {
		expect(store.getters[`${path}getEvents`].length).toBeGreaterThanOrEqual(0);
	});

	it('Текущее мероприятие - отсутствует', () => {
		expect(store.getters[`${path}getCurrentEvent`]).toEqual({});
	});
	
	it('Текущая организация - отсутствует', () => {
		expect(store.getters[`${path}getCurrentOrganization`]).toEqual({});
	});
	// ---------------------------------------------
	it('Tags - присутствует', async () => {
		await store.dispatch(`${path}requestAllTags`)
		expect(store.getters[`${path}getAllTags`].length).toBeGreaterThanOrEqual(0);
	});

	it('Events - присутствуют', async () => {
		await store.dispatch(`${path}requestEvents`, {
			params: {
				datetimeFrom: "2020-08-15",
				datetimeTo: "2020-08-15",
				priceFrom: 0,
				priceTo: 2000,
				reputation: 3,
				tags: [16, 2],
				people: 3000,
			},
			isLogged: false,
		})
		expect(store.getters[`${path}getEvents`].length).toBeGreaterThan(0);
	});


	it('Текущее мероприятие - отсутствует', async () => {
		const eventUuid = "300921b1-4ae3-442d-8396-642cde5e565b";
		await store.dispatch(`${path}requestEventInfo`, eventUuid);
		
		expect(Object.keys(store.getters[`${path}getCurrentEvent`]).length).toBeGreaterThan(0);
	});
	
	it('Текущая организация - отсутствует', async () => {
		const organizationUuid = "868d1201-2a4c-4686-9ed2-bd9335753693";
		await store.dispatch(`${path}requestOrganizationInfo`, organizationUuid);
	
		expect(Object.keys(store.getters[`${path}getCurrentOrganization`]).length).toBeGreaterThan(0);
	});


	
	
});