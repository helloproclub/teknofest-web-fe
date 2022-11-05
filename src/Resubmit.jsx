import React, {useState} from "react";
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
import { act } from "react-dom/test-utils";

const Resubmit = () => {
    const [division, setDivision] = useState('')
    // let defaultDivision = {label: '', value: ''} to store the default value division from fetching API user
    const [resubmitValue, setResubmitValue] = useState({fullname: '', nim: '', ktm: '', cv: '', coverLetter: '', linkedin: ''})
    const {fullname, nim, ktm, cv, coverLetter, linkedin} = resubmitValue

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

    const handleSubmit = e => {
        e.preventDefault()
    }

    const handleDivision = (selectedState, action) => {
        setDivision(selectedState.value)
        console.log(action);
    }

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
                            <input className='resubmit__input' type="fullname" name="fullname" value={fullname} onChange={handleResubmitChange} placeholder="Enter your fullname.." required />
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
                </div>

                <div className="right">
                    <div className="input__group">
                        <label htmlFor="">KTM Photo</label>
                        <div className="resubmit__input-container resubmit__input-container--link">
                            <div className="resubmit__icon">
                                <img src={gallery} alt="" />
                            </div>
                            <input className='resubmit__input' type="text" name="ktm" value={ktm} onChange={handleResubmitChange} placeholder="Attach google drive link" required />
                            <img src={link} alt="" />
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="">CV / Resume</label>
                        <div className="resubmit__input-container resubmit__input-container--link">
                            <div className="resubmit__icon">
                                <img src={note} alt="" />
                            </div>
                            <input className='resubmit__input' type="text" name="cv" value={cv} onChange={handleResubmitChange} placeholder="Attach google drive link" required />
                            <img src={link} alt="" />
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Cover Letter</label>
                        <div className="resubmit__input-container resubmit__input-container--link">
                            <div className="resubmit__icon">
                                <img src={documentText} alt="" />
                            </div>
                            <input className='resubmit__input' type="text" name="coverLetter" value={coverLetter} onChange={handleResubmitChange} placeholder="Attach google drive link" required />
                            <img src={link} alt="" />
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="">Linkedin Link</label>
                        <div className="resubmit__input-container resubmit__input-container--link">
                            <div className="resubmit__icon">
                                <img src={linkedinIcon} alt="" />
                            </div>
                            <input className='resubmit__input' type="text" name="linkedin" value={linkedin} onChange={handleResubmitChange} placeholder="Attach google drive link" required />
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