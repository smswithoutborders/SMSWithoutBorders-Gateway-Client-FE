import React from 'react';

const DashHeader = (props) => {
    return (
        <div className={props.className + " dash-header"}>
            <h2><strong>{props.title}</strong> {props.subtitle}</h2>
            <p>{props.description}</p>
        </div>
    );
}

export default DashHeader;