import React from 'react';

import { SiHuawei, SiVodafone } from "react-icons/si";

import MockData from "./MockData";

import DashHeader from '../../components/DashHeader';
import { ModemCard } from '../../components/Card';

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
            <div className="bx--col-lg-4" key={modem.id}>
                <ModemCard
                    icon={icon}
                    modemType={modem.model}
                    IMEI={modem.IMEI}
                />
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
            <div className="bx--grid bx--grid--narrow">

                <div className="bx--row">
                    <DashHeader
                        title="Modem"
                        subtitle="Nodes"
                        description="All modems currently connected"
                        className="bx--col"
                    />
                </div>
                <div className="bx--row">
                    <ModemList modems={MockData} />
                </div>
            </div>
        </>
    );
}

export default Modems;