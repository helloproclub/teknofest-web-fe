import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from './services/api/user';

import CookiesHelper from './helpers/cookies-helper';

import Loader from './Loader';

const StatusCheck = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(CookiesHelper.get('user') && JSON.parse(CookiesHelper.get('user')));
    const [isLoad, setIsLoad] = useState(true);

    const getUser = async () => {
        try {
            const { data: userData } = await User.getProfile();
            const { data: status } = await User.getStatus();
            const data = JSON.stringify({ ...userData.data, status: status.data });

            CookiesHelper.set('user', data);
            setUser(JSON.parse(data));
            setIsLoad(false);
        } catch(err) {
            if (err.response.status === 401) {
                navigate('/login');
            }
        }
        await User.getProfile()
    };

    const redirectBasedOnStatus = (user) => {
        switch (user.status.status) {
            case 1:
                navigate('/status/mistakes');
                break;
            case 2:
                navigate('/status/acc');
                break;
            default:
                navigate('/status/onprogress');
                break;
        }
    };

    useEffect(() => {
        if (!isLoad) return;
        getUser();
    }, []);

    useEffect(() => {
        if (user) redirectBasedOnStatus(user);
    }, [user]);

    return (
        <Loader isLoad={isLoad} />
    )
}

export default StatusCheck;
