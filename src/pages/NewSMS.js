import React, { useState } from 'react';
import {
    Form,
    FormGroup,
    TextInput,
    TextArea,
    Button,
    Loading,
} from 'carbon-components-react';
import { Send32 } from '@carbon/icons-react';
import { DashHeader } from '../components';
import { sendMessage } from '../services/api.service';
import { useParams, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const TextInputProps = {
    id: 'reciever',
    labelText: 'Phone Number',
    placeholder: "Enter recipient's number",
};

const TextAreaProps = {
    labelText: 'Message',
    placeholder: 'Enter the message to send',
    id: 'message',
    cols: 50,
    rows: 8,
};



const NewSMS = () => {
    const [receiver, setReceiver] = useState();
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState(false);
    const { index } = useParams();
    const navigate = useNavigate();
  
    if (!index) {
      toast.error("No modem selected");
      navigate(-1);
    }
  
    const handleSend = (evt) => {
        evt.preventDefault();
        setLoading(true);
        sendMessage(index, receiver, message)
            .then(() => {
                toast.success("message sent")
            })
            .catch((error) => {
                if (error.response) {
                    toast.error("failed to send message ensure the receiver number is correct and a device is selected");
                } else {
                    toast.error("Your Gateway may be disconnected");
                }
                setLoading(false);
            });
    };

    return (
        <div className="bx--grid">
            <div className="bx--row">
                <DashHeader
                    title="New"
                    subtitle="SMS"
                    description="Compose and send messages"
                    className="bx--col"
                />
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

                        {loading ? (
                            <>
                                <Loading
                                    description="loading"
                                    withOverlay={false}
                                    small
                                    className="centered-icon"
                                />
                                <span> sending</span>
                            </>
                        ) : (
                            <Button type="submit"
                                kind="primary"
                                renderIcon={Send32}
                                disabled={!index}
                            >
                                Send
                            </Button>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default NewSMS;