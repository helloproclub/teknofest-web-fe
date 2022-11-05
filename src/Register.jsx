import React, {useState} from "react";
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

const Register = () => {
    const [division, setDivision] = useState('')
    const [regisValue, setRegisValue] = useState({email: '', password: '', fullname: '', nim: '', ktm: '', cv: '', coverLetter: '', linkedin: ''})
    const {email, password, fullname, nim, ktm, cv, coverLetter, linkedin} = regisValue

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

    const handleSubmit = e => {
        e.preventDefault()
    }


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
                            <input className='register__input' type="fullname" name="fullname" value={fullname} onChange={handleRegisChange} placeholder="Enter your fullname.." required />
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
                            <input className='register__input' type="text" name="ktm" value={ktm} onChange={handleRegisChange} placeholder="Attach google drive link" required />
                            <img src={link} alt="" />
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="">CV / Resume</label>
                        <div className="register__input-container register__input-container--link">
                            <div className="register__icon">
                                <img src={note} alt="" />
                            </div>
                            <input className='register__input' type="text" name="cv" value={cv} onChange={handleRegisChange} placeholder="Attach google drive link" required />
                            <img src={link} alt="" />
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Cover Letter</label>
                        <div className="register__input-container register__input-container--link">
                            <div className="register__icon">
                                <img src={documentText} alt="" />
                            </div>
                            <input className='register__input' type="text" name="coverLetter" value={coverLetter} onChange={handleRegisChange} placeholder="Attach google drive link" required />
                            <img src={link} alt="" />
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Linkedin Link</label>
                        <div className="register__input-container register__input-container--link">
                            <div className="register__icon">
                                <img src={linkedinIcon} alt="" />
                            </div>
                            <input className='register__input' type="text" name="linkedin" value={linkedin} onChange={handleRegisChange} placeholder="Attach google drive link" required />
                            <img src={link} alt="" />
                        </div>
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