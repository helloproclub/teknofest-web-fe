import axios from '../../helpers/api';

const { get, post, put, destroy } = axios;

export const User = {
    get: () => get('/user'),
    getProfile: () => get('/user/me'),
    getStatus: () => get('/status/me'),
    post: (data) => post('/user', data),
    put: (data) => put('/user/me', data),
};

export default User;
