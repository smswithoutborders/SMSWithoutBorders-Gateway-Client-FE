import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GiWifiRouter } from 'react-icons/gi';
import { SiHuawei } from 'react-icons/si';
import { Button } from 'carbon-components-react';
import { useNavigate } from "react-router-dom";

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

    const [expand, setExpand] = useState(false);

    const {
        imei,
        manufacturer,
        model,
        index,
        operatorCode,
        operatorName,
        powerState,
        state
    } = props

    const navigate = useNavigate();

    return (
        <div className="modem-card">
            <div className="modem-card__header">
                {manufacturer === "huawei" ? (
                    <SiHuawei size={35} className="icon" />
                ) : (
                    <GiWifiRouter size={35} className="icon" />
                )}
                <p>{model || manufacturer || "modem"}</p>
            </div>
            {!expand ? (
                <div className="modem-card__body">
                    <p>{operatorName}</p>
                    <br />
                    <p>{imei}</p>
                </div>
            ) : (
                <div className="modem-card__body" style={{ textAlign: "left" }}>
                    <p>Index: {index || "N/A"}</p>
                    <p>Model: {model || "N/A"}</p>
                    <p>Manufacturer: {manufacturer || "N/A"}</p>
                    <p>IMEI: {imei || "N/A"}</p>
                    <p>Operator/ISP: {operatorName || "N/A"}</p>
                    <p>Operator Code: {operatorCode || "N/A"}</p>
                    <p>State: {state || "N/A"}</p>
                    <p>Power State: {powerState || "N/A"}</p>
                </div>
            )}
            <div className="modem-card__footer">
                <Button
                    kind="secondary"
                    onClick={() => setExpand(!expand)}
                >
                    {expand ? "close" : "details"}
                </Button>
                <Button
                    kind="primary"
                    onClick={() => navigate(`/logs/${index}`)}
                >
                    logs
                </Button>
            </div>
        </div>
    );
}

ModemCard.propTypes = {
    index: PropTypes.string,
    imei: PropTypes.string,
    manufacturer: PropTypes.string,
    model: PropTypes.string,
    operatorCode: PropTypes.string,
    operatorName: PropTypes.string,
    powerState: PropTypes.string,
    state: PropTypes.string,
}
