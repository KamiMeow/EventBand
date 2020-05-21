
import Profile from '@/views/logged/Profile';
import EventList from '@/views/unlogged/EventList';
import EventFeed from '@/views/logged/EventFeed';
import EventPage from '@/views/logged/EventPage';


export default [
    {
        path: "/profile",
        component: Profile,
        meta: {
            onlyForUser: true,
        },
    },
    {
        path: "/events/feed",
        component: EventFeed,
    },
    {
        path: "/events/list",
        component: EventList,
    },
    {
        path: "/events/:uuid",
        component: EventPage,
    },
];