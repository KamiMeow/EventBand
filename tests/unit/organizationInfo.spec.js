import {
	mount,
	shallowMount
} from './index';

import OrganizationInfo from '@/components/helper/OrganizationInfo';

describe('Organization info - компонент для вывода информации об организации', () =>{
	let wrapper;

	beforeEach(() => {
		wrapper = mount(OrganizationInfo, {
			state: false,
			propsData: {
				"organization": {
					"id": 1,
					"uuid": "989713f3-2f0b-4a14-b863-d98b5c00f94e",
					"name": "Fregalo",
					"reputation": 9,
					"description": "\n          Normal fregal Sergeevich. Sounds honorable, looks stylish. Here, only fucked up in the head anime. Who are willing to sell their mother for ramen and a point for the opportunity to see waifa.\n          If you're not like that, just walk through and leave us alone. We don't touch you, don't touch us. Trust me, you'll be better off. We're fucked up tight, we can fuck you in all the holes if you just mention anime in our presence.\n        ",
					"logo": "fregalo.jpg",
					"createdAt": "2020-05-21T22:08:16.398Z",
					"updatedAt": "2020-05-21T22:08:16.398Z"
				},
				"followersAmount": 3,
				"rating": 8,
			},
		});
	});

	it('Делаем snapshot', () => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('Является ли компонентом Vue', () => {
		expect(wrapper.isVueInstance()).toBeTruthy();
	});

	it('Card имеет заголовок', () => {
		expect(wrapper.find('.v-card__title').exists()).toBeTruthy();
	});

	it('Card имеет text', () => {
		expect(wrapper.find('.v-card__text').exists()).toBeTruthy();
	});

	it('Имеет аватар ', () => {
		expect(wrapper.find('.v-avatar').exists()).toBeTruthy();
	});
	
	
});