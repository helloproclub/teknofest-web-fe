import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isRegistAnounced } from "../helpers/registration-close-helper";

const AnouncementLayout = ({children}) => {
    const navigate = useNavigate();
    const [ anounced, setAnounced ] = useState(isRegistAnounced());

    useEffect(() => {
        if (!anounced) {
            navigate('/registration-closed');
        }
    }, [anounced]);

    useEffect(() => {
        document.addEventListener('registClosed', (e) => {
            setAnounced(isRegistAnounced());
        });
    }, []);

    return (
        <>
            { children }
        </>
    )
}

export default AnouncementLayout