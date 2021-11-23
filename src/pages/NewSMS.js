import React, { useState } from 'react';
import {
    Form,
    FormGroup,
    TextInput,
    TextArea,
    Button,
    Loading,
    Select,
    SelectItem
} from 'carbon-components-react';
import { Send32 } from '@carbon/icons-react';
import { DashHeader } from '../components';
import { sendMessage } from '../services/api.service';
import { useAppContext } from 'store';
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

const selectProps = {
    inline: false,
    invalid: false,
    invalidText: 'Please select a sending device',
    labelText: "Modem",
    helperText: 'This device will be used to send the message'
};


const NewSMS = () => {
    const [receiver, setReceiver] = useState();
    const [message, setMessage] = useState();
    const [device, setDevice] = useState();
    const [loading, setLoading] = useState(false);
    const { modems } = useAppContext();

    const handleSend = (evt) => {
        evt.preventDefault();
        setLoading(true);
        sendMessage(device, receiver, message)
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

                        <FormGroup legendText="">
                            <Select
                                {...selectProps}
                                id="select-1"
                                defaultValue="placeholder-item"
                                onChange={(evt) => setDevice(evt.target.value)}
                                invalid={!device}
                            >
                                <SelectItem
                                    disabled
                                    hidden
                                    value="placeholder-item"
                                    text="select a device"
                                />
                                {modems?.map((modem) => (
                                    <SelectItem
                                        key={modem.index}
                                        value={modem.index}
                                        text={`${modem.manufacturer} ${modem.model} - ${modem.operator_name}(${modem.operator_code})`}
                                    />
                                ))}
                            </Select>
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
                                disabled={!device}
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