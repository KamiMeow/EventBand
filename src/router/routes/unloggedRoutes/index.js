export default [
    {
        path: "/sign-in",
        name: "sign-in",
        component: () => import('@/views/unlogged/SignIn'),
        meta: {
            access: 'notLogin',
        },
    },
    {
        path: "/sign-up",
        component: () => import('@/views/unlogged/SignUp'), 
        meta: {
            access: 'notLogin',
        },
    },
    {
        path: "/reset-password",
        component: () => import('@/views/unlogged/ResetPassword'), 
        meta: {
            access: 'notLogin',
        },
		},
    {
			path: "/event/:uuid",
			component: () => import('@/views/unlogged/EventPage'),
			meta: {
				access: 'all',
			},
		},
		{
			path: "/organization/:uuid",
			component: () => import('@/views/unlogged/OrganizationPage'),
			meta: {
				access: 'all',
			},
		}
		
];