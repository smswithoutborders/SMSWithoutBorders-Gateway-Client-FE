import React, { useState } from 'react';

import { TextInput, Button, Loading } from 'carbon-components-react';

const Settings = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [URL, setURL] = useState(process.env.REACT_APP_DEKU_API_URL);
    const [isLoading, setIsLoading] = useState(false);

    const editUrl = () => {

        //if isEditing is true then we want to save instead
        if (isEditing) {
            updateUrl();
        } else {
            setIsEditing(!isEditing);
        }
    };

    const updateUrl = () => {
        console.log(URL)
        setIsLoading(true);

        setTimeout(() => {
            setIsEditing(!isEditing);
            setIsLoading(false);
        }, 1000);
    }

    return (
        <>
            <div className="bx--grid bx--grid--narrow">
                <div className="bx--row">
                    <div className="bx--col dash-header">
                        <h2><strong>System</strong> Settings</h2>
                        <p>All system settings and configuration</p>
                    </div>
                </div>

                <div className="bx--row">
                    <div className="bx--col">
                        <div className="dash-card">
                            <h4><strong>DEKU API URL</strong></h4>
                            <br />
                            {isEditing ?
                                <TextInput
                                    id="api-url-input"
                                    defaultValue={URL}
                                    warn={isLoading}
                                    warnText="This will change the currently set value"
                                    labelText="Edit URL"
                                    onChange={evt => setURL(evt.target.value)}
                                />
                                :
                                <p>{URL}</p>
                            }
                            <br />
                            {isLoading ?
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
                                    {isEditing ? "Save" : "Edit"}
                                </Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;