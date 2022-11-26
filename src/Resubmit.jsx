import React, {useEffect, useState} from "react";
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
import { act } from "react-dom/test-utils";
import CookiesHelper from "./helpers/cookies-helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import User from "./services/api/user";
import { resubmitSchema } from "./schema";
import { restructureYupValidationState } from "./helpers/yup-helper";
import Main from './layouts/Main';

const Resubmit = () => {
    const navigate = useNavigate()
    const user = CookiesHelper.get('user') && JSON.parse(CookiesHelper.get('user'))
    const [division, setDivision] = useState('')
    const [submissionLine, setSubmissionLine] = useState('')
    const [formError, setFormError] = useState({ is_error: false, errors: [] })
    // let defaultDivision = {label: '', value: ''} to store the default value division from fetching API user
    const [resubmitValue, setResubmitValue] = useState({email: '', password: '', fullName: '', nim: '', photo_KTM_url: '', cv_url: '', cover_letter_url: '', linkedIn_url: '', portfolio_url: ''})
    const {fullName, nim, photo_KTM_url, cv_url, cover_letter_url, linkedIn_url, portfolio_url} = resubmitValue

    const schema = resubmitSchema;

    // dataDivison.forEach(item => {
    //     if(item.value === division) {
    //         defaultDivision = item
    //     }
    // })

    const handleResubmitChange = e => {
        setResubmitValue(preValue => {
            return {
                ...preValue,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const payload = { ...resubmitValue, division, path: submissionLine, portfolio_url };
            await schema.validate(payload, { abortEarly: false });

            setFormError({ is_error: false, errors: [] });
            const { data } = await User.put(payload);

            toast.success(`Successfully resubmit`);
            navigate('/status');
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

    const handleDivision = (selectedState, action) => {
        setDivision(selectedState.value)
    }

    const handleSubmissionLine = (selectedState, action) => {
        setSubmissionLine(selectedState.value)
    }

    useEffect(() => {
        if (user) {
            if (user.status.status !== 1) {
                toast.error('Unauthorized');
                navigate('/status');
            } else {
                setResubmitValue({
                    fullName: user.fullName,
                    nim: user.nim,
                    photo_KTM_url: user.photo_KTM_url,
                    cover_letter_url: user.cover_letter_url,
                    cv_url: user.cv_url,
                    linkedIn_url: user.linkedIn_url,
                    portfolio_url: user.portfolio_url,
                });
                setDivision(user.division);
                setSubmissionLine(user.path);
            }
        } else {
            toast.error('Unauthorized, please login');
            navigate('/login');
        }
    }, []);

    return (
        <Main>
            <div className="resubmit">
                <div className="resubmit__title-box">
                    <h1 className="resubmit__title">Resubmit Document</h1>
                    <p className="resubmit__title-stroke">Resubmit Document</p>
                </div>
                <form className="resubmit__form" onSubmit={handleSubmit}>
                    <div className="left">
                        <div className="input__group">
                            <label htmlFor="">Fullname</label>
                            <div className="resubmit__input-container">
                                <div className="resubmit__icon">
                                    <img src={frame} alt="" />
                                </div>
                                <input className='resubmit__input' type="fullName" name="fullname" value={fullName} onChange={handleResubmitChange} placeholder="Enter your fullname.." required />
                            </div>
                            {!!formError.errors.length
                                && !!formError.errors.find((error) => error.path === 'fullName')
                                    && formError.errors.find((error) => error.path === 'fullName').errors.map((error) => <div key={error} className="resubmit__input-error">{error}</div>)}
                        </div>
                        <div className="input__group">
                            <label htmlFor="">NIM</label>
                            <div className="resubmit__input-container">
                                <div className="resubmit__icon">
                                    <img src={clipboard} alt="" />
                                </div>
                                <input className='resubmit__input' type="text" name="nim" value={nim} onChange={handleResubmitChange} placeholder="Enter your nim.." required />
                            </div>
                            {!!formError.errors.length
                                && !!formError.errors.find((error) => error.path === 'nim')
                                    && formError.errors.find((error) => error.path === 'nim').errors.map((error) => <div key={error} className="resubmit__input-error">{error}</div>)}
                        </div>
                        <div className="input__group">
                            <label htmlFor="">Select Division</label>
                            <div className="resubmit__input-container">
                                <div className="resubmit__icon">
                                    <img src={briefcase} alt="" />
                                </div>
                                <Select
                                    onChange={handleDivision}
                                    options={dataDivison}
                                    className={'select-input'}
                                    placeholder='Select your division..'
                                    // defaultValue={defaultDivision}
                                    name='division'
                                />
                            </div>
                            {!!formError.errors.length
                                && !!formError.errors.find((error) => error.path === 'division')
                                    && formError.errors.find((error) => error.path === 'division').errors.map((error) => <div key={error} className="resubmit__input-error">{error}</div>)}
                        </div>
                        <div className="input__group">
                            <label htmlFor="">Select Submission Line</label>
                            <div className="resubmit__input-container">
                                <div className="resubmit__icon">
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
                            {!!formError.errors.length
                                && !!formError.errors.find((error) => error.path === 'path')
                                    && formError.errors.find((error) => error.path === 'path').errors.map((error) => <div key={error} className="resubmit__input-error">{error}</div>)}
                        </div>
                    </div>

                    <div className="right">
                        <div className="input__group">
                            <label htmlFor="">KTM Photo</label>
                            <div className="resubmit__input-container resubmit__input-container--link">
                                <div className="resubmit__icon">
                                    <img src={gallery} alt="" />
                                </div>
                                <input className='resubmit__input' type="text" name="photo_KTM_url" value={photo_KTM_url} onChange={handleResubmitChange} placeholder="Attach google drive link" required />
                                <img src={link} alt="" />
                            </div>
                            {!!formError.errors.length
                                && !!formError.errors.find((error) => error.path === 'photo_KTM_url')
                                    && formError.errors.find((error) => error.path === 'photo_KTM_url').errors.map((error) => <div key={error} className="resubmit__input-error">{error}</div>)}
                        </div>
                        <div className="input__group">
                            <label htmlFor="">CV / Resume</label>
                            <div className="resubmit__input-container resubmit__input-container--link">
                                <div className="resubmit__icon">
                                    <img src={note} alt="" />
                                </div>
                                <input className='resubmit__input' type="text" name="cv_url" value={cv_url} onChange={handleResubmitChange} placeholder="Attach google drive link" required />
                                <img src={link} alt="" />
                            </div>
                            {!!formError.errors.length
                                && !!formError.errors.find((error) => error.path === 'cv_url')
                                    && formError.errors.find((error) => error.path === 'cv_url').errors.map((error) => <div key={error} className="resubmit__input-error">{error}</div>)}
                        </div>
                        <div className="input__group">
                            <label htmlFor="">Cover Letter</label>
                            <div className="resubmit__input-container resubmit__input-container--link">
                                <div className="resubmit__icon">
                                    <img src={documentText} alt="" />
                                </div>
                                <input className='resubmit__input' type="text" name="cover_letter_url" value={cover_letter_url} onChange={handleResubmitChange} placeholder="Attach google drive link" required />
                                <img src={link} alt="" />
                            </div>
                            {!!formError.errors.length
                                && !!formError.errors.find((error) => error.path === 'cover_letter_url')
                                    && formError.errors.find((error) => error.path === 'cover_letter_url').errors.map((error) => <div key={error} className="resubmit__input-error">{error}</div>)}
                        </div>
                        <div className="input__group">
                            <label htmlFor="">Linkedin Link</label>
                            <div className="resubmit__input-container resubmit__input-container--link">
                                <div className="resubmit__icon">
                                    <img src={linkedinIcon} alt="" />
                                </div>
                                <input className='resubmit__input' type="text" name="linkedIn_url" value={linkedIn_url} onChange={handleResubmitChange} placeholder="Attach google drive link" required />
                                <img src={link} alt="" />
                            </div>
                            {!!formError.errors.length
                                && !!formError.errors.find((error) => error.path === 'linkedIn_url')
                                    && formError.errors.find((error) => error.path === 'linkedIn_url').errors.map((error) => <div key={error} className="resubmit__input-error">{error}</div>)}
                        </div>
                        <div className="input__group">
                            <label htmlFor="">Portfolio ({submissionLine === 'ri' ? 'Required' : 'Optional'})</label>
                            <div className="resubmit__input-container resubmit__input-container--link">
                                <div className="resubmit__icon">
                                    <img src={documentText} alt="" />
                                </div>
                                <input
                                    className='resubmit__input'
                                    type="text"
                                    name="portfolio_url"
                                    value={portfolio_url}
                                    placeholder="Attach google drive link"
                                    required={submissionLine === 'ri'}
                                    onChange={handleResubmitChange}
                                />
                                <img src={link} alt="" />
                            </div>
                            {!!formError.errors.length
                                && !!formError.errors.find((error) => error.path === 'portfolio_url')
                                    && formError.errors.find((error) => error.path === 'portfolio_url').errors.map((error) => <div key={error} className="resubmit__input-error">{error}</div>)}
                        </div>
                        <button type="submit" className="resubmit__btn">Resubmit Now</button>
                    </div>
                </form>
            </div>
        </Main>
    )
}

export default Resubmit