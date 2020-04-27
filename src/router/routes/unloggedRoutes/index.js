import SignIn from '@/views/unlogged/SignIn';
import SignUp from '@/views/unlogged/SignUp';
import ResetPassword from '@/views/unlogged/ResetPassword';



export default [
    {
        path: "/sign-in",
        component: SignIn,
    },
    {
        path: "/sign-up",
        component: SignUp, 
    },
    {
        path: "/reset-password",
        component: ResetPassword, 
		},
		
];