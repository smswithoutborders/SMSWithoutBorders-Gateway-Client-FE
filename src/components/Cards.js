import React from 'react';
import PropTypes from 'prop-types';
import { GiWifiRouter } from 'react-icons/gi';
import { Button } from 'carbon-components-react';

export const DashCard = ({ children }) => {
    return (
        <div className="dash-card">
            {children}
        </div>
    );
}

DashCard.propTypes = {
    children: PropTypes.node
}

export const ModemCard = (props) => {
    return (
        <div className="modem-card">
            <div className="modem-card__header">
                <GiWifiRouter size={35} className="icon" />
                <p>modem</p>
            </div>
            <div className="modem-card__body">
                <p>{props.imei}</p>
            </div>
            <div className="modem-card__footer">
                <Button kind="secondary">Details</Button>
                <Button kind="primary">Logs</Button>
            </div>
        </div>
    );
}

ModemCard.propTypes = {
    imei: PropTypes.string
}
