import React from "react";
import Status from "./Status";

const Mistake = () => {
    return (
        <Status>
            <div className="mistake">
                <div className="mistake__container">
                    <h1 className="mistake__subtitle">Stage 1 : Overcome You Mistake</h1>
                    <p className="mistake__desc">Let's not be discouraged.</p>
                    <p className="mistake__desc" >Apparently, there are some issue with your sumission:</p>
                    <p className="mistake__desc mistake__desc-box">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </p>
                    <p className="mistake__desc">But, No hope is lost yet, <br /> Be brave and overcame your mistake...</p>
                    <a href="" className="mistake__btn">Fix Your Submission</a>
                </div>
            </div>
        </Status>
    )
}

export default Mistake