import axios from '../../helpers/api';

const { get, post, put, destroy } = axios;

export const Status = {
    get: () => get('/status'),
    getRejected: () => get('/status/reject'),
    getAccepted: () => get('/status/accept'),
    getUnreviewed: () => get('/status/review'),
    accept: (id) => post(`/status/${id}/accept`),
    reject: (id) => post(`/status/${id}/reject`),
};

export default Status;
