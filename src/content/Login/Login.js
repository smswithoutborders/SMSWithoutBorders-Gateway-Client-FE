import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, TextInput, Button } from 'carbon-components-react';
import { ArrowRight24 } from '@carbon/icons-react';

const Login = ({ setIsLoggedIn }) => {

    const username = useRef(null);
    const password = useRef(null);

    const formProps = {
        onSubmit: async (e) => {
            e.preventDefault();
            const loginData = {
                username: username.current.value,
                password: password.current.value
            }
            console.log(loginData);
            const userToken = await loginUser(loginData);
            console.log(userToken.token);
            setIsLoggedIn(userToken.token);
        },
    };

    const loginUser = async (credentials) => {
        return fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())
    };

    return (
        <div className="bx--grid login-page__container">
            <div className="bx--row">
                <div className="bx--col-lg-7">
                    <h1 className="login-page__title"><strong>C </strong> | Deck</h1>
                    <p>login portal</p>

                    <Form {...formProps}>
                        <TextInput
                            invalidText="Invalid error message."
                            labelText="User Name"
                            placeholder="enter username "
                            id="username"
                            ref={username}
                        />
                        <TextInput
                            invalidText="Invalid error message."
                            labelText="Password"
                            placeholder="your password here"
                            id="password"
                            ref={password}
                        />
                        <Button
                            className="submit-button"
                            kind="primary"
                            tabIndex={0}
                            type="submit"
                            renderIcon={ArrowRight24}
                        >
                            Continue
                        </Button>
                    </Form>

                </div>
            </div>
        </div>
    );
};

Login.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired
}

export default Login;