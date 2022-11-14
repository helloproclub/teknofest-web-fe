import React, { useState } from "react";

import { Auth } from './services/api/auth';

import mail from './asset/sms.svg';
import key from './asset/key.svg';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CookiesHelper from "./helpers/cookies-helper";

const Login = () => {
    const navigate = useNavigate()
    const user = CookiesHelper.get('user') && JSON.parse(CookiesHelper.get('user'))
    const [loginValue, setLoginValue] = useState({email: '', password: ''})
    const {email, password} = loginValue

    const handleLoginChange = e => {
        setLoginValue(preValue => {
            return {
                ...preValue,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await Auth.login(loginValue);
            
            toast.success(`Logged in`);
            navigate('/status');
        } catch (e) {
            toast.error(`Error, ${e.response ? e.response.data && e.response.data.msg : "Something's not right"}`);
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/status');
        }
    }, []);

    return (
        <div className="login">
            <div className="login__title-box">
                <h1 className="login__title">Login to Teknofest 2022</h1>
                <p className="login__title-stroke">Login to Teknofest 2022</p>
            </div>
            <form className="login__form" onSubmit={handleSubmit}>
                <div className="input__group">
                    <label htmlFor="email">Email</label>
                    <div className="login__input-container">
                        <div className="login__icon">
                            <img src={mail} alt="" />
                        </div>
                        <input className='login__input' onChange={handleLoginChange} type="email" id="email" name="email" value={email} placeholder="Enter your email.." required />
                    </div>
                </div>
                <div className="input__group">
                    <label htmlFor="password">Password</label>
                    <div className="login__input-container">
                        <div className="login__icon">
                            <img src={key} alt="" />
                        </div>
                        <input className='login__input' onChange={handleLoginChange} type="password" id="password" name="password" value={password} placeholder="Enter your password.." required />
                    </div>
                </div>
                <p className="login__forgot-password">
                    <a href="/forgot-password">Forgot Password?</a>
                </p>
                <button type="submit" className="login__btn">Login to Spaceship</button>
                <p className="login__redirect">
                    Don't have any account? <a href="/register">Register</a> now!
                </p>
            </form>
        </div>
    )
}

export default Login