import React from "react";
import logo from './asset/ProclubLogo.svg';

const Loader = ({isLoad}) => {
    return (
        <div className={`loader ${isLoad && 'onLoad'}`}>
            <div>
                <img src={logo} alt="" className="loader__logo" />
            </div>
        </div>
    )
}

export default Loader