import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CookiesHelper from "./helpers/cookies-helper";
import Status from "./Status";

const Mistake = () => {
    const navigate = useNavigate()
    const user = CookiesHelper.get('user') && JSON.parse(CookiesHelper.get('user'));

    useEffect(() => {
        if (user) {
            if (user.status.status !== 1) {
                navigate('/status');
            }
        } else {
            toast.error('Unauthorized, please login');
            navigate('/login');
        }
    }, []);
    
    return (
        <Status>
            <div className="mistake">
                <div className="mistake__container">
                    <h1 className="mistake__subtitle">Stage 1 : Overcome You Mistake</h1>
                    <p className="mistake__desc">Let's not be discouraged.</p>
                    <p className="mistake__desc" >Apparently, there are some issue with your sumission:</p>
                    <p className="mistake__desc mistake__desc-box">
                        { user && user.status.message }
                    </p>
                    <p className="mistake__desc">But, No hope is lost yet, <br /> Be brave and overcame your mistake...</p>
                    <a href="/resubmit" className="mistake__btn">Fix Your Submission</a>
                </div>
            </div>
        </Status>
    )
}

export default Mistake