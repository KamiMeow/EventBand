import {
	mount,
	shallowMount
} from './index';

import EventItem from '@/components/helper/EventItem';

describe('Event item - компонент для вывода мероприятий', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(EventItem, {
			store: false,
			propsData: {

				"tickets": [
					{
						"uuid": "03b303f8-cff9-4e3d-a90f-4ba926188f53",
						"name": "Welcome to MoscowJS 47",
						"description": "",
						"count": 250,
						"price": 0
					}
				],
				"event": {
					"uuid": "300921b1-4ae3-442d-8396-642cde5e565b",
					"name": "MoscowJS 47",
					"description": "MoscowJS return! MoscowJS 47",
					"coords": "(55.7522200, 37.5155600)",
					"datetimeFrom": "2020-05-10T00:00:00.000Z",
					"datetimeTo": "2020-05-10T00:00:00.000Z",
					"count": 250,
					"price": 0,
					"organization": {
							"uuid": "2dabf617-911f-4da8-85ee-d1a03685ba82",
							"name": "Tatar",
							"reputation": 7,
							"logo": "tatar.jpg"
					},
				},
				"tags": [
					{
							"id": 2,
							"name": "Technologies"
					},
					{
							"id": 3,
							"name": "IT"
					},
					{
							"id": 16,
							"name": "Alcoparty"
					},
				],
			},
		});
	});

	it ('Делаем снапшот', () => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('Event item является компонентом Vue', () => {
		expect(wrapper.isVueInstance()).toBeTruthy();
	});

	it('Имеет avatar', () => {
		expect(wrapper.find('.v-avatar').exists()).toBeTruthy();
	});

	it('Card имеет заголовок', () => {
		expect(wrapper.find('.v-card__title').exists()).toBeTruthy();
	});

	it('Card имеет подзаголовок', () => {
		expect(wrapper.find('.v-card__subtitle').exists()).toBeTruthy();
	})

	it('Имеет контейнер для тегов', () => {
		expect(wrapper.find('div > Tags')).toBeTruthy();
	});

	it('Имеет контейнер для информации о мероприятии', () => {
		expect(wrapper.find('span > Info')).toBeTruthy();
	});
});