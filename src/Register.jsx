import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { registerSchema } from './schema'

import { User } from "./services/api/user";
import { toast } from "react-toastify";

import mail from './asset/sms.svg';
import key from './asset/key.svg';
import frame from './asset/frame.svg';
import briefcase from './asset/briefcase.svg';
import clipboard from './asset/clipboard.svg';
import documentText from './asset/document-text.svg';
import linkedinIcon from './asset/linkedin.svg';
import gallery from './asset/gallery.svg';
import link from './asset/link.svg';
import note from './asset/note.svg';
import Select from 'react-select';
import dataDivison from "./division";
import dataSubmissionLine from "./submission-line";
import CookiesHelper from "./helpers/cookies-helper";
import { restructureYupValidationState } from "./helpers/yup-helper";

const Register = () => {
    const navigate = useNavigate()
    const user = CookiesHelper.get('user') && JSON.parse(CookiesHelper.get('user'))
    const [division, setDivision] = useState('')
    const [submissionLine, setSubmissionLine] = useState('')
    const [formError, setFormError] = useState({ is_error: false, errors: [] })
    const [regisValue, setRegisValue] = useState({email: '', password: '', fullName: '', nim: '', photo_KTM_url: '', cv_url: '', cover_letter_url: '', linkedIn_url: '', portfolio_url: ''})
    const {email, password, fullName, nim, photo_KTM_url, cv_url, cover_letter_url, linkedIn_url, portfolio_url} = regisValue

    const schema = registerSchema;

    const handleRegisChange = e => {
        setRegisValue(preValue => {
            return {
                ...preValue,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleDivision = (selectedState, action) => {
        setDivision(selectedState.value)
    }

    const handleSubmissionLine = (selectedState, action) => {
        setSubmissionLine(selectedState.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const payload = { ...regisValue, division, path: submissionLine, portfolio_url };
            await schema.validate(payload, { abortEarly: false });

            setFormError({ is_error: false, errors: [] });
            const { data } = await User.post(payload);

            toast.success(`Successfully Registered`);
            navigate('/login');
            toast.info(`Please use your credential to login`);
        } catch (e) {
            if (e.name === 'ValidationError') {
                const errors = restructureYupValidationState(e);

                setFormError({
                    is_error: true,
                    errors,
                });
                toast.error(`Validation error, please check your form carefully`);
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
        <div className="register">
            <div className="register__title-box">
                <h1 className="register__title">Register Account for Teknofest 2022</h1>
                <p className="register__title-stroke">Register Account for Teknofest 2022</p>
            </div>
            <form className="register__form" onSubmit={handleSubmit}>
                <div className="left">
                    <div className="input__group">
                        <label htmlFor="">Email</label>
                        <div className="register__input-container">
                            <div className="register__icon">
                                <img src={mail} alt="" />
                            </div>
                            <input className='register__input' type="email" name="email" value={email} onChange={handleRegisChange} placeholder="Enter your email.." />
                        </div>
                        {!!formError.errors.length
                            && !!formError.errors.find((error) => error.path === 'email')
                                && formError.errors.find((error) => error.path === 'email').errors.map((error) => <div key={error} className="register__input-error">{error}</div>)}
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Password</label>
                        <div className="register__input-container">
                            <div className="register__icon">
                                <img src={key} alt="" />
                            </div>
                            <input className='register__input' type="password" name="password" value={password} onChange={handleRegisChange} placeholder="Enter your password.." />
                        </div>
                        {!!formError.errors.length
                            && !!formError.errors.find((error) => error.path === 'password')
                                && formError.errors.find((error) => error.path === 'password').errors.map((error) => <div key={error} className="register__input-error">{error}</div>)}
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Fullname</label>
                        <div className="register__input-container">
                            <div className="register__icon">
                                <img src={frame} alt="" />
                            </div>
                            <input className='register__input' type="text" name="fullName" value={fullName} onChange={handleRegisChange} placeholder="Enter your fullname.." />
                        </div>
                        {!!formError.errors.length
                            && !!formError.errors.find((error) => error.path === 'fullName')
                                && formError.errors.find((error) => error.path === 'fullName').errors.map((error) => <div key={error} className="register__input-error">{error}</div>)}
                    </div>
                    <div className="input__group">
                        <label htmlFor="">NIM</label>
                        <div className="register__input-container">
                            <div className="register__icon">
                                <img src={clipboard} alt="" />
                            </div>
                            <input className='register__input' type="text" name="nim" value={nim} onChange={handleRegisChange} placeholder="Enter your nim.." />
                        </div>
                        {!!formError.errors.length
                            && !!formError.errors.find((error) => error.path === 'nim')
                                && formError.errors.find((error) => error.path === 'nim').errors.map((error) => <div key={error} className="register__input-error">{error}</div>)}
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Select Division</label>
                        <div className="register__input-container">
                            <div className="register__icon">
                                <img src={briefcase} alt="" />
                            </div>
                            <Select
                                onChange={handleDivision}
                                options={dataDivison}
                                className={'select-input'}
                                placeholder='Select your division..'
                                name='division'
                               
                            />
                        </div>
                        {!!formError.errors.length
                            && !!formError.errors.find((error) => error.path === 'division')
                                && formError.errors.find((error) => error.path === 'division').errors.map((error) => <div key={error} className="register__input-error">{error}</div>)}
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Select Submission Line</label>
                        <div className="register__input-container">
                            <div className="register__icon">
                                <img src={note} alt="" />
                            </div>
                            <Select
                                onChange={handleSubmissionLine}
                                options={dataSubmissionLine}
                                className={'select-input'}
                                placeholder='Select your submission line..'
                                name='submissionLine'
                               
                            />
                        </div>
                        {!!formError.errors.length
                            && !!formError.errors.find((error) => error.path === 'path')
                                && formError.errors.find((error) => error.path === 'path').errors.map((error) => <div key={error} className="register__input-error">{error}</div>)}
                    </div>
                </div>

                <div className="right">
                    <div className="input__group">
                        <label htmlFor="">KTM Photo</label>
                        <div className="register__input-container register__input-container--link">
                            <div className="register__icon">
                                <img src={gallery} alt="" />
                            </div>
                            <input className='register__input' type="text" name="photo_KTM_url" value={photo_KTM_url} onChange={handleRegisChange} placeholder="Attach google drive link" />
                            <img src={link} alt="" />
                        </div>
                        {!!formError.errors.length
                            && !!formError.errors.find((error) => error.path === 'photo_KTM_url')
                                && formError.errors.find((error) => error.path === 'photo_KTM_url').errors.map((error) => <div key={error} className="register__input-error">{error}</div>)}
                    </div>
                    <div className="input__group">
                        <label htmlFor="">CV / Resume</label>
                        <div className="register__input-container register__input-container--link">
                            <div className="register__icon">
                                <img src={note} alt="" />
                            </div>
                            <input className='register__input' type="text" name="cv_url" value={cv_url} onChange={handleRegisChange} placeholder="Attach google drive link" />
                            <img src={link} alt="" />
                        </div>
                        {!!formError.errors.length
                            && !!formError.errors.find((error) => error.path === 'cv_url')
                                && formError.errors.find((error) => error.path === 'cv_url').errors.map((error) => <div key={error} className="register__input-error">{error}</div>)}
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Cover Letter</label>
                        <div className="register__input-container register__input-container--link">
                            <div className="register__icon">
                                <img src={documentText} alt="" />
                            </div>
                            <input className='register__input' type="text" name="cover_letter_url" value={cover_letter_url} onChange={handleRegisChange} placeholder="Attach google drive link" />
                            <img src={link} alt="" />
                        </div>
                        {!!formError.errors.length
                            && !!formError.errors.find((error) => error.path === 'cover_letter_url')
                                && formError.errors.find((error) => error.path === 'cover_letter_url').errors.map((error) => <div key={error} className="register__input-error">{error}</div>)}
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Linkedin Link</label>
                        <div className="register__input-container register__input-container--link">
                            <div className="register__icon">
                                <img src={linkedinIcon} alt="" />
                            </div>
                            <input className='register__input' type="text" name="linkedIn_url" value={linkedIn_url} onChange={handleRegisChange} placeholder="Attach linkedIn link" />
                            <img src={link} alt="" />
                        </div>
                        {!!formError.errors.length
                            && !!formError.errors.find((error) => error.path === 'linkedIn_url')
                                && formError.errors.find((error) => error.path === 'linkedIn_url').errors.map((error) => <div key={error} className="register__input-error">{error}</div>)}
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Portfolio ({submissionLine === 'ri' ? 'Required' : 'Optional'})</label>
                        <div className="register__input-container register__input-container--link">
                            <div className="register__icon">
                                <img src={documentText} alt="" />
                            </div>
                            <input
                                className='register__input'
                                type="text" name="portfolio_url"
                                value={portfolio_url}
                                placeholder="Attach google drive link"
                                required={submissionLine === 'ri'}
                                onChange={handleRegisChange}
                            />
                            <img src={link} alt="" />
                        </div>
                        {!!formError.errors.length
                            && !!formError.errors.find((error) => error.path === 'portfolio_url')
                                && formError.errors.find((error) => error.path === 'portfolio_url').errors.map((error) => <div key={error} className="register__input-error">{error}</div>)}
                    </div>
                    <button type="submit" className="register__btn">Register Account</button>
                    <p className="register__redirect">
                        Already have an account? <a href="/login">Login</a> here
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Register
