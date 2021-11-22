import React from "react";
import PropTypes from 'prop-types';

export const DashHeader = ({ className, title, subtitle, description }) => {
    return (
        <div className={className + " dash-header"}>
            <h2><strong>{title}</strong> {subtitle}</h2>
            <p>{description}</p>
        </div>
    );
}

DashHeader.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string
}