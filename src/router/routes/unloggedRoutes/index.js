import SignIn from '@/views/unlogged/SignIn';
import SignUp from '@/views/unlogged/SignUp';
import ResetPassword from '@/views/unlogged/ResetPassword';



export default [
    {
        path: "/sign-in",
        name: "sign-in",
        component: SignIn,
        meta: {
            access: 'notLogin',
        },
    },
    {
        path: "/sign-up",
        component: SignUp, 
        meta: {
            access: 'notLogin',
        },
    },
    {
        path: "/reset-password",
        component: ResetPassword, 
        meta: {
            access: 'notLogin',
        },
    },
		
];