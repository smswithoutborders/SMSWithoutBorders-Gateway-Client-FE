import React from 'react';
import { DashHeader, ModemCard } from '../components';
import { useAppContext } from 'store';
import { Button } from 'carbon-components-react';

const Modems = () => {
    const { modems, getConnectedModems } = useAppContext();
    return (
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
                {modems?.length ? (
                    modems.map((modem) => (
                        <div className="bx--col-lg-4" key={modem.index}>
                            <ModemCard
                                imei={modem.imei}
                                manufacturer={modem.manufacturer}
                                model={modem.model}
                                index={modem.index}
                                operatorCode={modem.operator_code}
                                operatorName={modem.operator_name}
                                powerState={modem.power_state}
                                state={modem.state}
                            />
                        </div>
                    ))
                ) : (
                    <div className="bx--col-lg-16 empty-state-indicator">
                        <p>No modems connected</p>
                        <br />
                        <Button size="sm"
                            onClick={() => getConnectedModems()}
                        >
                            reload
                        </Button>
                    </div>
                )
                }
            </div>
        </div>
    );
}

export default Modems;