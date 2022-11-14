import React from "react";
import mail from './asset/sms.svg';
import { useState } from "react";
import Auth from "./services/api/auth";
import { toast } from "react-toastify";

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await Auth.forgotPassword({ email });
            
            toast.success(`We have sent your recovery link to your email, please check your email`);
        } catch (e) {
            toast.error(`Error, ${e.response ? e.response.data && e.response.data.msg : "Something's not right"}`);
        }
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