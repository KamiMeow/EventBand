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
			path: "/my-organization/info",
			component: () => import('@/views/logged/Organization'),
			meta: {
				access: 'needOrgLogin',
			},
		},
		{
			path: `/my-organization/event/create`,
			component: () => import('@/views/logged/Organization/CreateEventForm'),
			meta: {
				access: 'needOrgLogin',
			},
		},
		{
			path: '/my-organization/news/create',
			component: () => import('@/views/logged/Organization/CreateNewsForm'),
			meta: {
				access: 'needOrgLogin',
			},
		},
		{
			path: '/my-organization/edit',
			component: () => import('@/views/logged/Organization/EditOrganizationForm'),
			meta: {
				access: 'needOrgLogin',
			},
		},
		{
			path: "/my-organization/event/:uuid",
			component: () => import('@/views/unlogged/EventPage'),
			meta: {
				access: 'needOrgLogin',
			},
		},
		{
			path: "/my-organization/chat/edit",
			component: () => import('@/views/logged/Organization/ChatHistory'),
			meta: {
				access: 'needOrgLogin',
			},
		},
];