import React from 'react';
import { DashHeader, ModemCard } from '../components';

const MockData = [
    {
        index: 1,
        brand: "Huawei",
        model: "E303",
        imei: "805485056577889"
    },
    {
        index: 2,
        brand: "Vodafone",
        model: "SH-120",
        imei: "805487072577895"
    },
    {
        index: 3,
        brand: "Huawei",
        model: "E3131s",
        imei: "805487048577894"
    },
    {
        index: 4,
        brand: "Vodafone",
        model: "KE-36",
        imei: "805487056577784"
    },

];

const ModemList = ({ modems }) => {
    const modemsList = modems.map((modem) => {
        return (
            <div className="bx--col-lg-4" key={modem.id}>
                <ModemCard imei={modem.imei} />
            </div>
        )
    });
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