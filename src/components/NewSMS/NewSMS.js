import React from 'react';

import { Form, FormGroup, TextInput, TextArea, Button } from 'carbon-components-react';
import { Send32 } from '@carbon/icons-react';

const FormProps = {
    onSubmit: (e) => {
        e.preventDefault();
    },
};

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

const NewSMS = () => {
    return (
        <>


            <div className="bx--grid">

                <div className="bx--row">
                    <div className="dash-header bx--col">
                        <h2><strong>New</strong> SMS</h2>
                        <p>compose new messages</p>
                    </div>
                </div>
                <div className="bx--row">
                    <div className="bx--col">
                        <Form {...FormProps}>
                            <FormGroup>
                                <TextInput {...TextInputProps} />
                            </FormGroup>

                            <FormGroup>
                                <TextArea {...TextAreaProps} />
                            </FormGroup>

                            <Button kind="primary" renderIcon={Send32}>Send</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewSMS;