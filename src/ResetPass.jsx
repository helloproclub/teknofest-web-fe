import React from "react";
import key from './asset/key.svg';
import { useState } from "react";
import Auth from "./services/api/auth";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPass = () => {
    const navigate = useNavigate()
    const { resetUrl } = useParams()
    const [isAlert, setAlert] = useState(false)
    const [resetValue, setResetValue] = useState({newPassword: '', confirmNewPassword: ''})
    const {newPassword, confirmNewPassword} = resetValue

    const handleResetChange = e => {
        setResetValue(preValue => {
            return {
                ...preValue,
                [e.target.name]: e.target.value
            }
        })

        if(e.target.name === 'confirmNewPassword' && e.target.value === newPassword) setAlert(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(confirmNewPassword !== newPassword) {
            setAlert(true)
        } else {
            // Do something on user's new password
            try {
                const { data } = await Auth.resetPassword( resetUrl, { password: newPassword });
                
                toast.success(`Your password has been reset`);
                navigate('/');
            } catch (e) {
                toast.error(`Error, ${e.response ? e.response.data && e.response.data.msg : "Something's not right"}`);
            }
        }
    }

    return (
        <div className="reset">
            <div className="reset__title-box">
                <h1 className="reset__title">Reset Password</h1>
                <p className="reset__title-stroke">Reset Password</p>
            </div>
            <form className="reset__form" onSubmit={handleSubmit}>
                <div className="input__group">
                    <label htmlFor="password">New Password</label>
                    <div className="reset__input-container">
                        <div className="reset__icon">
                            <img src={key} alt="" />
                        </div>
                        <input className='reset__input' onChange={handleResetChange} type="password" id="newPass" name="newPassword" value={newPassword} placeholder="Enter new password.." required />
                    </div>
                </div>
                <div className="input__group">
                    <label htmlFor="password">Confirm New Password</label>
                    <div className="reset__input-container">
                        <div className="reset__icon">
                            <img src={key} alt="" />
                        </div>
                        <input className='reset__input' onChange={handleResetChange} type="password" id="confirmNewpass" name="confirmNewPassword" value={confirmNewPassword} placeholder="Confirm new password.." required />
                    </div>
                    <p className={`reset__alert ${isAlert && 'alerted'}`}>
                        Your confirmation password didn't match!
                    </p>
                </div>
                <button type="submit" className="reset__btn">Confirm</button>
            </form>
        </div>
    )
}

export default ResetPass