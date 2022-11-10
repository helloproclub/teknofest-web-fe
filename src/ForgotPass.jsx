import React from "react";
import mail from './asset/sms.svg';
import key from './asset/key.svg';
import { useState } from "react";

const ForgotPass = () => {
    const [isAlert, setAlert] = useState(false)
    const [forgotValue, setForgotValue] = useState({email: '', newPassword: '', confirmNewPassword: ''})
    const {email, newPassword, confirmNewPassword} = forgotValue

    const handleForgotChange = e => {
        setForgotValue(preValue => {
            return {
                ...preValue,
                [e.target.name]: e.target.value
            }
        })

        console.log(e.target.value);

        if(e.target.name === 'confirmNewPassword' && e.target.value === newPassword) setAlert(false)
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(confirmNewPassword != newPassword) {
            setAlert(true)
        } else {
            // POST the user new password
        }
    }

    return (
        <div className="forgot">
            <div className="forgot__title-box">
                <h1 className="forgot__title">Forgot Password</h1>
                <p className="forgot__title-stroke">Forgot Password</p>
            </div>
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
                <div className="input__group">
                    <label htmlFor="password">New Password</label>
                    <div className="forgot__input-container">
                        <div className="forgot__icon">
                            <img src={key} alt="" />
                        </div>
                        <input className='forgot__input' onChange={handleForgotChange} type="password" id="newPass" name="newPassword" value={newPassword} placeholder="Enter new password.." required />
                    </div>
                </div>
                <div className="input__group">
                    <label htmlFor="password">Confirm New Password</label>
                    <div className="forgot__input-container">
                        <div className="forgot__icon">
                            <img src={key} alt="" />
                        </div>
                        <input className='forgot__input' onChange={handleForgotChange} type="password" id="confirmNewpass" name="confirmNewPassword" value={confirmNewPassword} placeholder="Confirm new password.." required />
                    </div>
                    <p className={`forgot__alert ${isAlert && 'alerted'}`}>
                        Your confirmation password didn't match!
                    </p>
                </div>
                <button type="submit" className="forgot__btn">Confirm</button>
            </form>
        </div>
    )
}

export default ForgotPass