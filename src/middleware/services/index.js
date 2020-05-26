/**
 * Подключение всех сервисов и их экспорт
 */

import ExampleService from './ExampleService';
import UserService from './UserService';
import GeneralService from './GeneralService';
import ProfileService from './ProfileService';
import OrganizationService from './OrganizationService';
import EventService from './EventService';

export default {
	GeneralService,
	OrganizationService,
	ProfileService,
	ExampleService,
	EventService,
	UserService,
};
