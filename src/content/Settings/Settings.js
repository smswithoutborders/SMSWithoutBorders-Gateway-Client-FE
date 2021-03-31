import React, { useState } from 'react';

import { TextInput, Button, Loading } from 'carbon-components-react';

import DashHeader from '../../components/DashHeader';
import { DashCard } from '../../components/Card';

const Settings = () => {


    const [API, setAPI] = useState(process.env.REACT_APP_API_URL);
    // const [Deku, setDeku] = useState(process.env.REACT_APP_DEKU_API_URL);
    const [updateAPI, setUpdateAPI] = useState(
        {
            loading: false,
            editing: false
        }
    );

    const editUrl = () => {
        //if isEditing is true then we want to save instead
        if (updateAPI.editing) {
            updateUrl();
        } else {
            setUpdateAPI({ loading: false, editing: true });
        }
    };

    const updateUrl = () => {
        console.log("update url hit");
        setUpdateAPI({ loading: true, editing: true });
        setTimeout(() => {
            setUpdateAPI({ loading: false, editing: false });
        }, 3000);
    }

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
                                    onClick={() => editUrl()}
                                >
                                    {updateAPI.editing ? "Save" : "Edit"}
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