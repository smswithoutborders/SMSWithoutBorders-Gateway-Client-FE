import React from 'react';

import { Form, FormGroup, TextArea, Dropdown, Button } from 'carbon-components-react';
import { Send32 } from '@carbon/icons-react';
import DashHeader from '../../components/DashHeader';

const FormProps = {
    onSubmit: (e) => {
        e.preventDefault();
    },
};

const options = [
    {
        id: 'option-1',
        text: 'Enter recipients manually',
    },
    {
        id: 'option-2',
        text: 'Select recipients from contact list',
    },
];

const DropdownProps = {
    id: "option",
    titleText: "Recipient List",
    label: "Please choose an option",
    items: options,
    itemToString: (item) => (item ? item.text : ''),
    onChange: (option) => {
        console.log(option.selectedItem.id)
    },
}

const TextAreaProps = {
    labelText: 'Message',
    placeholder: 'Enter the message to send',
    id: 'message',
    cols: 50,
    rows: 8,
};

const BulkSMS = () => {
    return (
        <>
            <div className="bx--grid">
                <div className="bx--row">
                    <DashHeader
                        title="Bulk"
                        subtitle="SMS"
                        description="Compose and send bulk messages"
                        className="bx--col"
                    />
                </div>

                <div className="bx--row">
                    <div className="bx--col">
                        <Form {...FormProps}>
                            <FormGroup>
                                <Dropdown {...DropdownProps} />
                            </FormGroup>

                            <FormGroup>
                                <TextArea {...TextAreaProps} />
                            </FormGroup>

                            <Button type="submit" kind="primary" renderIcon={Send32}>Send</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BulkSMS;