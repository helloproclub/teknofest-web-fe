import axios from '../../helpers/api';

const { get, post, put, destroy } = axios;

export const Auth = {
    login: (data) => post('/user/login', data),
    logout: () => get('/user/logout'),
    forgotPassword: (data) => post('/user/forgotPassword', data),
    resetPassword: (resetUrl, data) => put(`/user/resetPassword/${resetUrl}`, data),
};

export default Auth;
