import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import discord from './asset/discord.svg';
import CookiesHelper from "./helpers/cookies-helper";
import Status from "./Status";

const Approved = () => {
    const navigate = useNavigate()
    const user = CookiesHelper.get('user') && JSON.parse(CookiesHelper.get('user'));

    useEffect(() => {
        if (user) {
            if (user.status.status !== 2) {
                navigate('/status');
            }
        } else {
            toast.error('Unauthorized, please login');
            navigate('/login');
        }
    }, []);

    return (
        <Status>
            <div className="acc">
                <div className="acc__container">
                    <h1 className="acc__subtitle">Stage 1 : Go Beyond The Ordinary</h1>
                    <p className="acc__desc">Well Done!!</p>
                    <p className="acc__desc" >You have <span>successfully passed the first step</span>. Let's not celebrate until we're out of here. Because the real war had just started.</p>
                    <p className="acc__dashed">----</p>
                    <p className="acc__desc">Welcome to Teknofest 2022 <br /> You've been invited to join our battlefield</p>
                    <a href={user.status.discord_inv_url} className="acc__btn" target="_blank" rel="noreferrer">
                        <img src={discord} alt="" />
                        Join Proclub Discord
                    </a>
                </div>
            </div>
        </Status>
    )
}

export default Approved