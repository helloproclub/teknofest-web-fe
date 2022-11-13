import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const StatusCheck = () => {
    const navigate = useNavigate()
    const [isLoad, setIsLoad] = useState(true);

    useEffect(() => {

    }, []);

    return (
        <Loader isLoad={isLoad} />
    )
}

export default StatusCheck;
