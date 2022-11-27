import React, { useEffect, useState } from "react";
import progressBar from './asset/progress.svg';
import logoutIcon from './asset/logout.svg';
import { toast } from "react-toastify";
import CookiesHelper from "./helpers/cookies-helper";
import { useNavigate } from "react-router-dom";
import Auth from "./services/api/auth";
import { isRegistAnounced } from "./helpers/registration-close-helper";

const OnProgress = () => {
    const navigate = useNavigate()
    const user = CookiesHelper.get('user') && JSON.parse(CookiesHelper.get('user'));
    const [ anounced, setAnounced ] = useState(isRegistAnounced());

    const logout = async () => {
        try {
            const { data } = await Auth.logout();
            CookiesHelper.remove('user');
            toast.success('Logged out')
            navigate('/')
        } catch(e) {
            toast.error(`Error, ${e.response ? e.response.data && e.response.data.msg : "Something's not right"}`);
        }
    }

    useEffect(() => {
        if (user) {
            if (user.status.status !== 0 && anounced) {
                navigate('/status');
            }
        } else {
            toast.error('Unauthorized, please login');
            navigate('/login');
        }
    }, []);

    return (
        <div className="progress">
            <div className="progress__title-box">
                <h1 className="progress__title">You are Still in Progress</h1>
                <p className="progress__title-stroke">You are Still in Progress</p>
            </div>
            <img src={progressBar} alt="" className="progress__bar" />
            <p className="progress__desc">come back later, don't forget to follow Instagram @helloproclub so you don't miss any information</p>
            <button type="button" className="logout__btn" onClick={logout}>
                <img src={logoutIcon} alt="" />
                Logout Account
            </button>
        </div>
    )
}

export default OnProgress