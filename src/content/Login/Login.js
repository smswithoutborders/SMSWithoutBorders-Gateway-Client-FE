import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, TextInput, Button, Loading } from 'carbon-components-react';
import { ArrowRight24 } from '@carbon/icons-react';

const Login = ({ setIsLoggedIn }) => {

    const username = useRef(null);
    const password = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const formProps = {
        onSubmit: async (e) => {
            e.preventDefault();
            setIsLoading(!isLoading);
            const loginData = {
                username: username.current.value,
                password: password.current.value
            }
            const userToken = await loginUser(loginData);
            setToken(userToken.token);
            setIsLoggedIn(true);
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

    const setToken = (token) => {
        sessionStorage.setItem('c-deck-token', token);
    };

    return (
        <div className="bx--grid login-page__container">
            <div className="bx--row">
                <div className="bx--col-lg-7">
                    <h1 className="login-page__title">Log in to <strong>C | Deck</strong></h1>
                    <p>Please use issued credentials</p>

                    <Form {...formProps}>
                        <FormGroup>
                            <TextInput
                                invalidText="Invalid error message."
                                labelText="User Name"
                                placeholder="enter username "
                                id="username"
                                ref={username}
                                required
                            />
                            <br />
                            <TextInput.PasswordInput
                                invalidText="Invalid error message."
                                labelText="Password"
                                placeholder="enter password"
                                id="password"
                                ref={password}
                                required
                            />
                        </FormGroup>

                        {isLoading ?
                            <>
                                <Loading
                                    description="loading"
                                    withOverlay={false}
                                    small
                                    className="centered-icon"
                                />
                                <span> Verifying information</span>
                            </> :
                            <Button
                                className="submit-button"
                                kind="primary"
                                type="submit"
                                renderIcon={ArrowRight24}
                            >
                                Continue
                        </Button>}

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