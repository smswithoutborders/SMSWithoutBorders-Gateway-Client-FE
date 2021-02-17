import React from 'react';

import { SiHuawei, SiVodafone } from "react-icons/si";

import { Button } from 'carbon-components-react';

import MockData from "./MockData";

const ModemList = (props) => {
    const modems = props.modems;
    const modemsList = modems.map((modem) => {

        let icon = "none";
        switch (modem.brand) {
            case "Huawei":
                icon = <SiHuawei size={35} className="icon" />

                break;
            case "Vodafone":
                icon = <SiVodafone size={35} className="icon" />

                break;
            default:
                icon = "none";
        }

        return (
            <div className="bx--col-lg-4">
                <div className="modem-card">
                    <div className="modem-card__header">
                        {icon}
                        <h3>{modem.model}</h3>
                    </div>
                    <div className="modem-card__body">
                        <p>{modem.IMEI}</p>
                    </div>
                    <div className="modem-card__footer">
                        <Button kind="secondary">Details</Button>
                        <Button kind="primary">Logs</Button>
                    </div>
                </div>
            </div>
        )
    }
    );
    return (
        <>
            {modemsList}
        </>
    );

};

const Modems = () => {
    return (
        <>
            <div className="dash-header">
                <h2><strong>Modem</strong> Nodes</h2>
                <p>All nodes currently registered</p>
            </div>
            <div className="bx--grid bx--grid--narrow">
                <div className="bx--row">
                    <ModemList modems={MockData} />
                </div>
            </div>
        </>
    );
}

export default Modems;