import React from "react";
import logo from './asset/ProclubLogo.svg';
import navIcon from './asset/unduh.svg';
import logoutIcon from './asset/logout.svg';
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from './services/api/auth';
import { toast } from "react-toastify";
import CookiesHelper from "./helpers/cookies-helper";

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const checkURL = () => location.pathname.includes('acc') || location.pathname.includes('mistakes')

    const logout = async () => {
        try {
            const { data } = await Auth.logout();
            CookiesHelper.remove('user');
            toast.success('Logged out')
            navigate('/')
        } catch(e) {
            toast.error(`Error, ${e.response ? e.response.data && e.response.data.msg : "Something's not right"}`);
        }
    }

    return (
        <nav className={`navbar ${checkURL() && 'navbar__logout'}`}>
            <img src={logo} alt="" className="navbar__img" />
            <a href="https://drive.google.com/uc?id=1trE0W6WdHv1YrN4Eohpw5U4ezCK8lAhV&export=download" className="navbar__download" target="_self" >
                <img src={navIcon} alt="" className="navbar__icon" />
                Download Guide Book
            </a>
            {checkURL() && 
            <button type="button" className="logout__btn" onClick={logout}>
                <img src={logoutIcon} alt="" />
                Logout Account
            </button>}
        </nav>
    )
}

export default Navbar