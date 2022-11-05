import React from "react";
import progressBar from './asset/progress.svg';
import logoutIcon from './asset/logout.svg';

const OnProgress = () => {
    return (
        <div className="progress">
            <div className="progress__title-box">
                <h1 className="progress__title">You are Still in Progress</h1>
                <p className="progress__title-stroke">You are Still in Progress</p>
            </div>
            <img src={progressBar} alt="" className="progress__bar" />
            <p className="progress__desc">come back later, don't forget to follow Instagram @helloproclub so you don't miss any information</p>
            <button type="button" className="logout__btn">
                <img src={logoutIcon} alt="" />
                Logout Account
            </button>
        </div>
    )
}

export default OnProgress