import React, { useState, useEffect } from 'react';

import { TextInput, Button, Loading } from 'carbon-components-react';

import { DashHeader } from '../../components/DashHeader';

import { DashCard } from '../../components/Card';
import { CircleFilled20 as Indicator } from '@carbon/icons-react';

import { getServiceState } from '../../services/settings.service';

const Settings = () => {


    const [API, setAPI] = useState(process.env.REACT_APP_API_URL);
    const [Deku, setDeku] = useState(process.env.REACT_APP_DEKU_API_URL);
    const [serviceState, setServiceState] = useState();
    const [updateAPI, setUpdateAPI] = useState(
        {
            loading: false,
            editing: false
        }
    );

    const [updateDeku, setUpdateDeku] = useState(
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

    let color = serviceState === "active" ? "green" : "red";

    useEffect(() => {
        getServiceState()
            .then(response => {
                setServiceState(response.state);
            })
            .catch((error) => {
                // Error 😨
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    setServiceState("inactive");

                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    setServiceState("failed");
                } else {
                    // Something happened in setting up the request and triggered an Error
                    setServiceState("failed");
                }
            });
    }, []);


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
                            <h4><strong>DEKU Services</strong></h4>
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
                            <h4><strong>API URL</strong></h4>
                            <br />
                            {updateAPI.editing ?
                                <TextInput
                                    id="api-url-input"
                                    defaultValue={API}
                                    warn={updateAPI.editing}
                                    warnText="This will change the currently set value"
                                    labelText="Edit URL"
                                    onChange={evt => setAPI(evt.target.value)}
                                />
                                :
                                <p>{API}</p>
                            }
                            <br />
                            {updateAPI.loading ?
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
                                    onClick={() => editUrl(updateAPI, setUpdateAPI)}
                                >
                                    {updateAPI.editing ? "Save" : "Edit"}
                                </Button>
                            }
                        </DashCard>
                    </div>
                </div>

                <div className="bx--row">
                    <div className="bx--col">
                        <DashCard>
                            <h4><strong>Deku API URL</strong></h4>
                            <br />
                            {updateDeku.editing ?
                                <TextInput
                                    id="deku-url-input"
                                    defaultValue={Deku}
                                    warn={updateDeku.editing}
                                    warnText="This will change the currently set value"
                                    labelText="Edit URL"
                                    onChange={evt => setDeku(evt.target.value)}
                                />
                                :
                                <p>{Deku}</p>
                            }
                            <br />
                            {updateDeku.loading ?
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
                                    onClick={() => editUrl(updateDeku, setUpdateDeku)}
                                >
                                    {updateDeku.editing ? "Save" : "Edit"}
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