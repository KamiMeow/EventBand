import NewsItem from '@/components/helper/NewsItem';
import { mount, shallowMount } from './index';

describe('News item - компонент для вывода новостей', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(NewsItem);
	});

	it ('Делаем снапшот', () => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('Является компонентом Vue', () => {
		expect(wrapper.isVueInstance()).toBeTruthy();
	});
	
	it ('Имеет toolbar заголовок', () => {
		expect(wrapper.find('.v-toolbar__title').isVisible()).toBe(true);
	});

	it('Не имеет toolbar заголовок', () => {
		wrapper = shallowMount(NewsItem, {
			store: false,
			propsData: {
				showOrganizationName: false,
			},
		});
		
		expect(wrapper.contains('v-toolbar-title')).toBe(false);
	});

	it ('Имеет toolbar заголовок c текстом "Org name"', () => {
		wrapper = shallowMount(NewsItem);
			
		expect(wrapper.find('.white--text').html()).toContain('Org name');
	});

	it ('Имеет toolbar загловок с текстом "Unique name"', () => {
		wrapper = shallowMount(NewsItem, {
			store: false,
			propsData: {
				organization: {
					uuid: 'bfc0de35-5789-4746-aef3-aa5bc393836a',
					logo: 'no-homo.jpg',
					name: 'Unique name',
				},
			}
		});

		expect(wrapper.find('.white--text').html()).toContain('Unique name');
	});

	it ('Сard имеет заголовок', () => {
		expect(wrapper.contains('.v-card__title')).toBeTruthy();
	});

	it ('Сard имеет подзаголовок', () => {
		expect(wrapper.contains('.v-card__subtitle')).toBeTruthy();
	});

	it ('Сard имеет текст', () => {
		expect(wrapper.contains('.v-card__text')).toBeTruthy();
	});
	
});
