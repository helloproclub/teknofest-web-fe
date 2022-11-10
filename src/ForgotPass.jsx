import React from "react";
import mail from './asset/sms.svg';
import { useState } from "react";

const ForgotPass = () => {
    const [forgotValue, setForgotValue] = useState({email: ''})
    const {email} = forgotValue

    const handleForgotChange = e => {
        setForgotValue(preValue => {
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
        <div className="forgot">
            <div className="forgot__title-box">
                <h1 className="forgot__title">Forgot Password</h1>
                <p className="forgot__title-stroke">Forgot Password</p>
            </div>
            <p className="forgot__message">We will send an email to reset your password</p>
            <form className="forgot__form" onSubmit={handleSubmit}>
                <div className="input__group">
                    <label htmlFor="email">Email</label>
                    <div className="forgot__input-container">
                        <div className="forgot__icon">
                            <img src={mail} alt="" />
                        </div>
                        <input className='forgot__input' onChange={handleForgotChange} type="email" id="email" name="email" value={email} placeholder="Enter your email.." required />
                    </div>
                </div>
                <button type="submit" className="forgot__btn">Confirm</button>
            </form>
        </div>
    )
}

export default ForgotPass