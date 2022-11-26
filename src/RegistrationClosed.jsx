import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isRegistClosed } from "./helpers/registration-close-helper";

const RegistrationClosed = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!isRegistClosed()) {
            navigate('/')
        }
    }, []);

    return (
        <div className="registration-closed">
            <h4 className="registration-closed__title">Sorry, but registration is already closed! 😢</h4>
            <p className="registration-closed__subtitle">Try again next year! (;</p>

            <a href="/" className="registration-closed__btn">Back to main page</a>
        </div>
    );
};

export default RegistrationClosed;
