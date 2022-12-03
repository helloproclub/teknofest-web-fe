import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CookiesHelper from "./helpers/cookies-helper";
import { isRegistAnounced, isResubmitClosed } from "./helpers/registration-close-helper";
import Status from "./Status";

const Mistake = () => {
    const navigate = useNavigate()
    const user = CookiesHelper.get('user') && JSON.parse(CookiesHelper.get('user'));
    const [ resubmitClosed, setResubmitClosed ] = useState(isResubmitClosed());
    const [ anounced, setAnounced ] = useState(isRegistAnounced());

    useEffect(() => {
        if (user) {
            if (!anounced) navigate('/status/onprogress')
            else if (user.status.status !== 1) navigate('/status')
        } else {
            toast.error('Unauthorized, please login');
            navigate('/login');
        }

        document.addEventListener('registClosed', (e) => {
            setResubmitClosed(isResubmitClosed());
        });
    }, []);
    
    return (
        <Status>
            <div className="mistake">
                <div className="mistake__container">
                    <h1 className="mistake__subtitle">Stage 1 : You Still Have a Long Journey</h1>
                    <p className="mistake__desc">Let's not be discouraged.</p>
                    <p className="mistake__desc" >
                        Apparently, you did not pass the selection phase.
                        <br></br>
                        Thank you for showing interest in Proclub. We hope to see you next year.
                    </p>
                    <p className="mistake__desc mistake__desc-box">
                        { user && user.status.message }
                    </p>
                    {
                        !resubmitClosed && (
                            <>
                                <p className="mistake__desc">But, No hope is lost yet, <br /> Be brave and overcame your mistake...</p>
                                <a href="/resubmit" className="mistake__btn">Fix Your Submission</a>
                            </>
                        )
                    }
                </div>
            </div>
        </Status>
    )
}

export default Mistake
