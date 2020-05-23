
import Profile from '@/views/logged/Profile';
import EventList from '@/views/unlogged/EventList';
import EventFeed from '@/views/logged/EventFeed';



export default [
    {
			path: "/profile",
			component: Profile,
			meta: {
				access: 'needLogin',
			},
    },
    {
			path: "/events/feed",
			component: EventFeed,
			meta: {
				access: 'needLogin',
			},
    },
    {
			path: "/events/list",
			component: EventList,
			meta: {
				access: 'notLogin',
			},
    },
];