import React, { useState } from "react";

import { Auth } from './services/api/auth';
import { loginSchema } from './schema'

import mail from './asset/sms.svg';
import key from './asset/key.svg';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CookiesHelper from "./helpers/cookies-helper";
import { restructureYupValidationState } from "./helpers/yup-helper";

const Login = () => {
    const navigate = useNavigate()
    const user = CookiesHelper.get('user') && JSON.parse(CookiesHelper.get('user'))
    const [formError, setFormError] = useState({ is_error: false, errors: [] })
    const [loginValue, setLoginValue] = useState({email: '', password: ''})
    const {email, password} = loginValue

    const schema = loginSchema;

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
            await schema.validate(loginValue, { abortEarly: false });

            setFormError({ is_error: false, errors: [] });
            await Auth.login(loginValue);
            
            toast.success(`Logged in`);
            navigate('/status');
        } catch (e) {
            if (e.name === 'ValidationError') {
                const errors = restructureYupValidationState(e);

                setFormError({
                    is_error: true,
                    errors,
                });
                toast.error(`Validation error, please check your credential carefully`);
            } else {
                toast.error(`Error, ${e.response ? e.response.data && e.response.data.msg : "Something's not right"}`);
            }
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
                        <input className='login__input' onChange={handleLoginChange} type="email" id="email" name="email" value={email} placeholder="Enter your email.." />
                    </div>
                    {!!formError.errors.length
                        && !!formError.errors.find((error) => error.path === 'email')
                            && formError.errors.find((error) => error.path === 'email').errors.map((error) => <div key={error} className="login__input-error">{error}</div>)}
                </div>
                <div className="input__group">
                    <label htmlFor="password">Password</label>
                    <div className="login__input-container">
                        <div className="login__icon">
                            <img src={key} alt="" />
                        </div>
                        <input className='login__input' onChange={handleLoginChange} type="password" id="password" name="password" value={password} placeholder="Enter your password.." />
                    </div>
                    {!!formError.errors.length
                        && !!formError.errors.find((error) => error.path === 'password')
                            && formError.errors.find((error) => error.path === 'password').errors.map((error) => <div key={error} className="login__input-error">{error}</div>)}
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