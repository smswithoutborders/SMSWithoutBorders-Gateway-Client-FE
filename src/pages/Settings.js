import React, { useState } from 'react';
import { TextInput, Button, Loading } from 'carbon-components-react';
import { DashHeader, DashCard } from '../components';
import { CircleFilled20 as Indicator } from '@carbon/icons-react';
import { useAppContext } from 'store';

const Settings = () => {
    const { serviceState } = useAppContext();
    const [gateway, setGateway] = useState(process.env.REACT_APP_GATEWAY_API_URL);
    const [updateGateway, setUpdateGateway] = useState(
        {
            loading: false,
            editing: false
        }
    );

    const editUrl = (urlState, setUrlState) => {
        //if isEditing is true then we want to save instead
        if (urlState.editing) {
            updateUrl(setUrlState);
        } else {
            setUrlState({ loading: false, editing: true });
        }
    };

    const updateUrl = (setUrlState) => {
        console.log("update url hit");
        setUrlState({ loading: true, editing: true });
        setTimeout(() => {
            setUrlState({ loading: false, editing: false });
        }, 3000);
    }

    let color = serviceState === "active" ? "#198038" : "#da1e28";

    return (
        <>
            <div className="bx--grid bx--grid--narrow">
                <div className="bx--row">
                    <DashHeader
                        title="System"
                        subtitle="Settings"
                        description="All system settings and configuration"
                        className="bx--col"
                    />
                </div>

                <div className="bx--row">
                    <div className="bx--col">
                        <DashCard>
                            <h4><strong>Gateway Connection Status</strong></h4>
                            <br />
                            <p>
                                <Indicator
                                    style={{ color: color }}
                                    className="centered-icon"
                                />
                                <span> {serviceState}</span>
                            </p>
                        </DashCard>
                    </div>
                </div>

                <div className="bx--row">
                    <div className="bx--col">
                        <DashCard>
                            <h4><strong>Gateway API URL</strong></h4>
                            <br />
                            {updateGateway.editing ?
                                <TextInput
                                    id="deku-url-input"
                                    defaultValue={gateway}
                                    warn={updateGateway.editing}
                                    warnText="This will change the currently set value"
                                    labelText="Edit URL"
                                    onChange={evt => setGateway(evt.target.value)}
                                />
                                :
                                <p>{gateway}</p>
                            }
                            <br />
                            {updateGateway.loading ?
                                <>
                                    <Loading
                                        description="loading"
                                        withOverlay={false}
                                        small
                                        className="centered-icon"
                                    />
                                    <span> saving</span>
                                </>
                                :
                                <Button
                                    size="sm"
                                    kind="secondary"
                                    onClick={() => editUrl(updateGateway, setUpdateGateway)}
                                >
                                    {updateGateway.editing ? "Save" : "Edit"}
                                </Button>
                            }
                        </DashCard>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;