/**
 * Подключение модулей
 */

import * as notification from './notification';
import * as examples from './example';
import * as auth from './auth';
import * as profile from './profile';
import * as organization from './organization';
import * as nonauth from './non-auth.js'
import * as event from './event';

export default {
	notification,
	organization,
	examples,
	profile,
	nonauth,
	event,
	auth,
};
