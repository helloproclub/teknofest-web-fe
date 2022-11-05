import React from 'react';

const Status = ({children}) => {
    return (
        <div className="status">
            <div className="status__title-box">
                <h1 className="status__title">Mission Report</h1>
                <p className="status__title-stroke">Mission Report</p>
            </div>
            {children}
        </div>
    )
}

export default Status