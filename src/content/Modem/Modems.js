import React from 'react';

import { SiHuawei, SiVodafone } from "react-icons/si";

import { Button } from 'carbon-components-react';

import MockData from "./MockData";

const singleModem = props => {

    return (
        <>
            <div className="bx--col-lg-4">
                <div className="modem-card">
                    <div className="modem-card__header">
                        <SiHuawei size={35} className="icon" />
                        <h3>{props.model}</h3>
                    </div>
                    <div className="modem-card__body">
                        <p>{props.IMEI}</p>
                    </div>
                    <div className="modem-card__footer">
                        <Button kind="secondary">Details</Button>
                        <Button kind="primary">Logs</Button>
                    </div>
                </div>
            </div>
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
                    <div className="bx--col-lg-4">
                        <div className="modem-card">
                            <div className="modem-card__header">
                                <SiHuawei size={35} className="icon" />
                                <h3>E303</h3>
                            </div>
                            <div className="modem-card__body">
                                <p>805487056577894</p>
                            </div>
                            <div className="modem-card__footer">
                                <Button kind="secondary">Details</Button>
                                <Button kind="primary">Logs</Button>
                            </div>
                        </div>
                    </div>
                    <div className="bx--col-lg-4">
                        <div className="modem-card">
                            <div className="modem-card__header">
                                <SiVodafone size={35} className="icon" />
                                <h3>SH-120</h3>
                            </div>
                            <div className="modem-card__body">
                                <p>805487056577894</p>
                            </div>
                            <div className="modem-card__footer">
                                <Button kind="secondary">Details</Button>
                                <Button kind="primary">Logs</Button>
                            </div>
                        </div>
                    </div>
                    <div className="bx--col-lg-4">
                        <div className="modem-card">
                            <div className="modem-card__header">
                                <SiHuawei size={35} className="icon" />
                                <h3>E3131s</h3>
                            </div>
                            <div className="modem-card__body">
                                <p>805487056577894</p>
                            </div>
                            <div className="modem-card__footer">
                                <Button kind="secondary">Details</Button>
                                <Button kind="primary">Logs</Button>
                            </div>
                        </div>
                    </div>
                    <div className="bx--col-lg-4">
                        <div className="modem-card">
                            <div className="modem-card__header">
                                <SiVodafone size={35} className="icon" />
                                <h3>E156</h3>
                            </div>
                            <div className="modem-card__body">
                                <p>805487056577894</p>
                            </div>
                            <div className="modem-card__footer">
                                <Button kind="secondary">Details</Button>
                                <Button kind="primary">Logs</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bx--row">
                    <div className="bx--col-lg-4">
                        <div className="modem-card">
                            <div className="modem-card__header">
                                <SiHuawei size={35} className="icon" />
                                <h3>E303</h3>
                            </div>
                            <div className="modem-card__body">
                                <p>805487056577894</p>
                            </div>
                            <div className="modem-card__footer">
                                <Button kind="secondary">Details</Button>
                                <Button kind="primary">Logs</Button>
                            </div>
                        </div>
                    </div>
                    <div className="bx--col-lg-4">
                        <div className="modem-card">
                            <div className="modem-card__header">
                                <SiVodafone size={35} className="icon" />
                                <h3>SH-120</h3>
                            </div>
                            <div className="modem-card__body">
                                <p>805487056577894</p>
                            </div>
                            <div className="modem-card__footer">
                                <Button kind="secondary">Details</Button>
                                <Button kind="primary">Logs</Button>
                            </div>
                        </div>
                    </div>
                    <div className="bx--col-lg-4">
                        <div className="modem-card">
                            <div className="modem-card__header">
                                <SiHuawei size={35} className="icon" />
                                <h3>E3131s</h3>
                            </div>
                            <div className="modem-card__body">
                                <p>805487056577894</p>
                            </div>
                            <div className="modem-card__footer">
                                <Button kind="secondary">Details</Button>
                                <Button kind="primary">Logs</Button>
                            </div>
                        </div>
                    </div>
                    <div className="bx--col-lg-4">
                        <div className="modem-card">
                            <div className="modem-card__header">
                                <SiVodafone size={35} className="icon" />
                                <h3>E156</h3>
                            </div>
                            <div className="modem-card__body">
                                <p>805487056577894</p>
                            </div>
                            <div className="modem-card__footer">
                                <Button kind="secondary">Details</Button>
                                <Button kind="primary">Logs</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modems;