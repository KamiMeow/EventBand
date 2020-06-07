export default [
    {
			path: "/profile",
			component: () => import('@/views/logged/Profile'),
			meta: {
				access: 'needLogin',
			},
    },
    {
			path: "/events/feed",
			component: () => import('@/views/logged/EventFeed'),
			meta: {
				access: 'needLogin',
			},
    },
    {
			path: "/events/list",
			component: () => import('@/views/unlogged/EventList'),
			meta: {
				access: 'all',
			},
		},
		{
			path: "/my-organization",
			component: () => import('@/views/logged/Organization'),
			meta: {
				access: 'organization',
			},
		},
		{
			path: `/my-organization/event/edit/:uuid`,
			component: () => import('@/views/logged/EditEventForm'),
		},
		{
			path: `/my-organization/event/create`,
			component: () => import('@/views/logged/Organization/CreateEventForm'),
		},
		{
			path: '/my-organization/news/create',
			component: () => import('@/views/logged/Organization/CreateNewsForm'),
		},
		{
			path: '/my-organization/edit',
			component: () => import('@/views/logged/Organization/EditOrganizationForm'),
		},
];