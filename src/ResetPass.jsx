import React from "react";
import key from './asset/key.svg';
import { useState } from "react";
import Auth from "./services/api/auth";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { passwordSchema } from './schema';
import { restructureYupValidationState } from "./helpers/yup-helper";

const ResetPass = () => {
    const navigate = useNavigate()
    const { resetUrl } = useParams()
    const [isAlert, setAlert] = useState(false)
    const [formError, setFormError] = useState({ is_error: false, errors: [] })
    const [resetValue, setResetValue] = useState({newPassword: '', confirmNewPassword: ''})
    const {newPassword, confirmNewPassword} = resetValue

    const schema = passwordSchema;

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

            try {
                const payload = { password: newPassword };
                await schema.validate(payload, { abortEarly: false });

                setFormError({ is_error: false, errors: [] });
            } catch (e) {
                if (e.name === 'ValidationError') {
                    const errors = restructureYupValidationState(e);
    
                    setFormError({
                        is_error: true,
                        errors,
                    });
                    toast.error(`Validation error, please check your password carefully`);
                } else {
                    toast.error(`Error, ${e.response ? e.response.data && e.response.data.msg : "Something's not right"}`);
                }
            }
        } else {
            // Do something on user's new password
            try {
                const payload = { password: newPassword };
                await schema.validate(payload, { abortEarly: false });

                setFormError({ is_error: false, errors: [] });
                const { data } = await Auth.resetPassword(resetUrl, payload);
                
                toast.success(`Your password has been reset`);
                navigate('/');
            } catch (e) {
                if (e.name === 'ValidationError') {
                    const errors = restructureYupValidationState(e);
    
                    setFormError({
                        is_error: true,
                        errors,
                    });
                    toast.error(`Validation error, please check your password carefully`);
                } else {
                    toast.error(`Error, ${e.response ? e.response.data && e.response.data.msg : "Something's not right"}`);
                }
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
                        <input className='reset__input' onChange={handleResetChange} type="password" id="newPass" name="newPassword" value={newPassword} placeholder="Enter new password.." />
                    </div>
                    {!!formError.errors.length
                        && !!formError.errors.find((error) => error.path === 'password')
                            && formError.errors.find((error) => error.path === 'password').errors.map((error) => <div key={error} className="reset__input-error">{error}</div>)}
                </div>
                <div className="input__group">
                    <label htmlFor="password">Confirm New Password</label>
                    <div className="reset__input-container">
                        <div className="reset__icon">
                            <img src={key} alt="" />
                        </div>
                        <input className='reset__input' onChange={handleResetChange} type="password" id="confirmNewpass" name="confirmNewPassword" value={confirmNewPassword} placeholder="Confirm new password.." />
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