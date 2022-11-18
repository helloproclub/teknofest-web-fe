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

const Resubmit = () => {
    const navigate = useNavigate()
    const user = CookiesHelper.get('user') && JSON.parse(CookiesHelper.get('user'))
    const [division, setDivision] = useState('')
    const [submissionLine, setSubmissionLine] = useState('')
    // let defaultDivision = {label: '', value: ''} to store the default value division from fetching API user
    const [resubmitValue, setResubmitValue] = useState({email: '', password: '', fullName: '', nim: '', photo_KTM_url: '', cv_url: '', cover_letter_url: '', linkedIn_url: '', portfolio_url: ''})
    const {fullName, nim, photo_KTM_url, cv_url, cover_letter_url, linkedIn_url, portfolio_url} = resubmitValue

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
            const { data } = await User.put({ ...resubmitValue, division, path: submissionLine, portfolio_url });

            toast.success(`Successfully resubmit`);
            navigate('/status');
        } catch (e) {
            toast.error(`Error, ${e.response ? e.response.data && e.response.data.msg : "Something's not right"}`);
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
                            <input className='resubmit__input' type="fullname" name="fullname" value={fullName} onChange={handleResubmitChange} placeholder="Enter your fullname.." required />
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="">NIM</label>
                        <div className="resubmit__input-container">
                            <div className="resubmit__icon">
                                <img src={clipboard} alt="" />
                            </div>
                            <input className='resubmit__input' type="text" name="nim" value={nim} onChange={handleResubmitChange} placeholder="Enter your nim.." required />
                        </div>
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
                    </div>
                </div>

                <div className="right">
                    <div className="input__group">
                        <label htmlFor="">KTM Photo</label>
                        <div className="resubmit__input-container resubmit__input-container--link">
                            <div className="resubmit__icon">
                                <img src={gallery} alt="" />
                            </div>
                            <input className='resubmit__input' type="text" name="ktm" value={photo_KTM_url} onChange={handleResubmitChange} placeholder="Attach google drive link" required />
                            <img src={link} alt="" />
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="">CV / Resume</label>
                        <div className="resubmit__input-container resubmit__input-container--link">
                            <div className="resubmit__icon">
                                <img src={note} alt="" />
                            </div>
                            <input className='resubmit__input' type="text" name="cv" value={cv_url} onChange={handleResubmitChange} placeholder="Attach google drive link" required />
                            <img src={link} alt="" />
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Cover Letter</label>
                        <div className="resubmit__input-container resubmit__input-container--link">
                            <div className="resubmit__icon">
                                <img src={documentText} alt="" />
                            </div>
                            <input className='resubmit__input' type="text" name="coverLetter" value={cover_letter_url} onChange={handleResubmitChange} placeholder="Attach google drive link" required />
                            <img src={link} alt="" />
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Linkedin Link</label>
                        <div className="resubmit__input-container resubmit__input-container--link">
                            <div className="resubmit__icon">
                                <img src={linkedinIcon} alt="" />
                            </div>
                            <input className='resubmit__input' type="text" name="linkedin" value={linkedIn_url} onChange={handleResubmitChange} placeholder="Attach google drive link" required />
                            <img src={link} alt="" />
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Portfolio ({submissionLine === 'ri' ? 'Required' : 'Optional'})</label>
                        <div className="resubmit__input-container resubmit__input-container--link">
                            <div className="resubmit__icon">
                                <img src={documentText} alt="" />
                            </div>
                            <input
                                className='resubmit__input'
                                type="text" name="portfolio_url"
                                value={portfolio_url}
                                placeholder="Attach google drive link"
                                required={submissionLine === 'ri'}
                                onChange={handleResubmitChange}
                            />
                            <img src={link} alt="" />
                        </div>
                    </div>
                    <button type="submit" className="resubmit__btn">Resubmit Now</button>
                </div>
            </form>
        </div>
    )
}

export default Resubmit