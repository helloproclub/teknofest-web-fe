import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isRegistClosed } from "../helpers/registration-close-helper";

const Layout = ({children}) => {
    const navigate = useNavigate();
    const [ registClosed, setRegistClosed ] = useState(isRegistClosed());

    useEffect(() => {
        if (registClosed) {
            navigate('/registration-closed');
        }
    }, [registClosed]);

    useEffect(() => {
        document.addEventListener('registClosed', (e) => {
            setRegistClosed(isRegistClosed());
        });
    }, []);

    return (
        <>
            { children }
        </>
    )
}

export default Layout