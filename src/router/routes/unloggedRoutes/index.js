import SignIn from '@/views/unlogged/SignIn';
import SignUp from '@/views/unlogged/SignUp';
import ResetPassword from '@/views/unlogged/ResetPassword';



export default [
    {
        path: "/signIn",
        component: SignIn,
    },
    {
        path: "/signUp",
        component: SignUp, 
    },
    {
        path: "/resetPassword",
        component: ResetPassword, 
    },
];