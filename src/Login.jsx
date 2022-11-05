import React from "react";
import mail from './asset/sms.svg';
import key from './asset/key.svg';
import { useState } from "react";

const Login = () => {
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

    const handleSubmit = e => {
        e.preventDefault()
    }

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
                <button type="submit" className="login__btn">Login to Spaceship</button>
                <p className="login__redirect">
                    Don't have any account? <a href="/register">Register</a> now!
                </p>
            </form>
        </div>
    )
}

export default Login