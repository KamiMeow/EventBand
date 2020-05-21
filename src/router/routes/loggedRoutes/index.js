
import Profile from '@/views/logged/Profile';
import EventList from '@/views/unlogged/EventList';
import EventFeed from '@/views/logged/EventFeed';
import EventPage from '@/views/logged/EventPage';


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
    {
        path: "/events/:uuid",
        component: EventPage,
        meta: {
            access: 'all',
        },
    },
];