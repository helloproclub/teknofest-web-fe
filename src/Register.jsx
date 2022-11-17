import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

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

const Register = () => {
    const navigate = useNavigate()
    const user = CookiesHelper.get('user') && JSON.parse(CookiesHelper.get('user'))
    const [division, setDivision] = useState('')
    const [submissionLine, setSubmissionLine] = useState('')
    const [regisValue, setRegisValue] = useState({email: '', password: '', fullName: '', nim: '', photo_KTM_url: '', cv_url: '', cover_letter_url: '', linkedIn_url: '', portfolio_url: ''})
    const {email, password, fullName, nim, photo_KTM_url, cv_url, cover_letter_url, linkedIn_url, portfolio_url} = regisValue

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
            const { data } = await User.post({ ...regisValue, division });

            toast.success(`Successfully Registered`);
            navigate('/login');
            toast.info(`Please use your credential to login`);
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
                            <input className='register__input' type="email" name="email" value={email} onChange={handleRegisChange} placeholder="Enter your email.." required />
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Password</label>
                        <div className="register__input-container">
                            <div className="register__icon">
                                <img src={key} alt="" />
                            </div>
                            <input className='register__input' type="password" name="password" value={password} onChange={handleRegisChange} placeholder="Enter your password.." required />
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Fullname</label>
                        <div className="register__input-container">
                            <div className="register__icon">
                                <img src={frame} alt="" />
                            </div>
                            <input className='register__input' type="text" name="fullName" value={fullName} onChange={handleRegisChange} placeholder="Enter your fullname.." required />
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="">NIM</label>
                        <div className="register__input-container">
                            <div className="register__icon">
                                <img src={clipboard} alt="" />
                            </div>
                            <input className='register__input' type="text" name="nim" value={nim} onChange={handleRegisChange} placeholder="Enter your nim.." required />
                        </div>
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
                                required
                            />
                        </div>
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
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="right">
                    <div className="input__group">
                        <label htmlFor="">KTM Photo</label>
                        <div className="register__input-container register__input-container--link">
                            <div className="register__icon">
                                <img src={gallery} alt="" />
                            </div>
                            <input className='register__input' type="text" name="photo_KTM_url" value={photo_KTM_url} onChange={handleRegisChange} placeholder="Attach google drive link" required />
                            <img src={link} alt="" />
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="">CV / Resume</label>
                        <div className="register__input-container register__input-container--link">
                            <div className="register__icon">
                                <img src={note} alt="" />
                            </div>
                            <input className='register__input' type="text" name="cv_url" value={cv_url} onChange={handleRegisChange} placeholder="Attach google drive link" required />
                            <img src={link} alt="" />
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Cover Letter</label>
                        <div className="register__input-container register__input-container--link">
                            <div className="register__icon">
                                <img src={documentText} alt="" />
                            </div>
                            <input className='register__input' type="text" name="cover_letter_url" value={cover_letter_url} onChange={handleRegisChange} placeholder="Attach google drive link" required />
                            <img src={link} alt="" />
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Linkedin Link</label>
                        <div className="register__input-container register__input-container--link">
                            <div className="register__icon">
                                <img src={linkedinIcon} alt="" />
                            </div>
                            <input className='register__input' type="text" name="linkedIn_url" value={linkedIn_url} onChange={handleRegisChange} placeholder="Attach google drive link" required />
                            <img src={link} alt="" />
                        </div>
                    </div>
                    {
                        submissionLine && submissionLine === 'ri'
                            ?
                                <div className="input__group">
                                    <label htmlFor="">Portfolio</label>
                                    <div className="register__input-container register__input-container--link">
                                        <div className="register__icon">
                                            <img src={documentText} alt="" />
                                        </div>
                                        <input className='register__input' type="text" name="portfolio_url" value={portfolio_url} onChange={handleRegisChange} placeholder="Attach google drive link" required />
                                        <img src={link} alt="" />
                                    </div>
                                </div>
                            : null
                    }
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