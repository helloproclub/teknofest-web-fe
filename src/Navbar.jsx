import React from "react";
import logo from './asset/ProclubLogo.svg';
import navIcon from './asset/unduh.svg';
import logoutIcon from './asset/logout.svg';
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation()

    const checkURL = () => location.pathname.includes('acc') || location.pathname.includes('mistakes')

    return (
        <nav className={`navbar ${checkURL() && 'navbar__logout'}`}>
            <img src={logo} alt="" className="navbar__img" />
            <a href="" className="navbar__download">
                <img src={navIcon} alt="" className="navbar__icon" />
                Download Guide Book
            </a>
            {checkURL() && 
            <button type="button" className="logout__btn">
                <img src={logoutIcon} alt="" />
                Logout Account
            </button>}
        </nav>
    )
}

export default Navbar