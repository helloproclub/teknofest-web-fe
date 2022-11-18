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
        if (!CookiesHelper.get('user')) {
            CookiesHelper.set('user', JSON.stringify({
                _id: "6364402c82d49303cb9ed3c7",
                fullName: "hidayattaufiqur",
                email: "htaufiqurrahma2001@gmail.com",
                nim: "1301204304213",
                division: "0",
                path: "0",
                photo_KTM_url: "drive.google.com",
                cv_url: "drive.google.com",
                cover_letter_url: "drive.google.com",
                linkedIn_url: "https://linkedin.com/",
                portfolio_url: "drive.google.com",
                createdAt: "2022-11-03T22:26:52.802Z",
                updatedAt: "2022-11-07T05:28:47.080Z",
                status: {
                    _id: "6364402d82d49303cb9ed3c9",
                    user_id: "6364402c82d49303cb9ed3c7",
                    status: 1,
                    message: "kasihan 🙁\n",
                    discord_inv_url: "discord.com",
                    __v: 0
                }
            }));
        }
        // getUser();
    }, []);

    useEffect(() => {
        if (user) redirectBasedOnStatus(user);
    }, [user]);

    return (
        <Loader isLoad={isLoad} />
    )
}

export default StatusCheck;
