import React, { useState } from 'react';
import {
    Form,
    FormGroup,
    TextInput,
    TextArea,
    Button,
    InlineNotification,
    Loading
} from 'carbon-components-react';
import { Send32 } from '@carbon/icons-react';

import { DashHeader } from '../components';
import { sendMessage } from '../services/api.service';

const TextInputProps = {
    id: 'reciever',
    labelText: 'Recipient',
    placeholder: "Enter recipient's number",
};

const TextAreaProps = {
    labelText: 'Message',
    placeholder: 'Enter the message to send',
    id: 'message',
    cols: 50,
    rows: 8,
};

let notificationProps = {
    kind: "info",
    lowContrast: true,
    role: 'alert',
    title: 'Success',
    subtitle: 'Message sent.',
    iconDescription: 'Notification',
    statusIconDescription: 'Notification status icon',
    hideCloseButton: false
};


const NewSMS = () => {
    const [receiver, setReceiver] = useState();
    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(
        {
            loading: false,
            notify: false
        }
    );

    const handleSend = (evt) => {
        evt.preventDefault();
        setAlert({ loading: true, notify: false });
        sendMessage(receiver, message)
            .then(response => {
                switch (response.status) {
                    case 200:
                        notificationProps.kind = "success";
                        setAlert({ loading: false, notify: true });
                        break;

                    case 400:
                        notificationProps.kind = "error";
                        notificationProps.title = "An error occured";
                        notificationProps.subtitle = response.message;
                        setAlert({ loading: false, notify: true });
                        break;

                    default:
                        setAlert({ loading: false, notify: true });
                }
            })
            .catch((error) => {
                // Error 😨
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    notificationProps.kind = "error";
                    notificationProps.title = error.response.message;
                    notificationProps.subtitle = "could not send message";
                    setAlert({ loading: false, notify: true });

                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    notificationProps.kind = "error";
                    notificationProps.title = "Network error";
                    notificationProps.subtitle = "could not send message";
                    setAlert({ loading: false, notify: true });
                } else {
                    // Something happened in setting up the request and triggered an Error
                    notificationProps.kind = "error";
                    notificationProps.title = "Network error";
                    notificationProps.subtitle = "could not send message";
                    setAlert({ loading: false, notify: true });
                }
            });
    };

    return (
        <>
            <div className="bx--grid">
                <div className="bx--row">
                    <DashHeader
                        title="New"
                        subtitle="SMS"
                        description="Compose and send messages"
                        className="bx--col"
                    />

                    {alert.notify ?
                        <div className="bx--col">
                            <InlineNotification {...notificationProps} />
                        </div>
                        : ""
                    }
                </div>
                <div className="bx--row">
                    <div className="bx--col">
                        <Form onSubmit={(evt) => handleSend(evt)}>
                            <FormGroup legendText="">
                                <TextInput {...TextInputProps}
                                    onBlur={(evt) => setReceiver(evt.target.value)}
                                    required
                                />
                            </FormGroup>

                            <FormGroup legendText="">
                                <TextArea {...TextAreaProps}
                                    onBlur={(evt) => setMessage(evt.target.value)}
                                    required
                                />
                            </FormGroup>

                            {alert.loading ?
                                <>
                                    <Loading
                                        description="loading"
                                        withOverlay={false}
                                        small
                                        className="centered-icon"
                                    />
                                    <span> sending</span>
                                </>
                                :
                                <Button type="submit"
                                    kind="primary"
                                    renderIcon={Send32}
                                >
                                    Send
                                </Button>
                            }
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewSMS;