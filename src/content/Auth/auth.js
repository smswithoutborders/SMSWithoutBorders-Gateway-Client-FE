import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, TextInput, Button, Loading, Link } from 'carbon-components-react';
import { Login24, Information20 } from '@carbon/icons-react';
import { setToken } from '../../services/auth.service';

const Login = ({ setIsLoggedIn }) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [registered, setRegistered] = useState(true);

    const formProps = {
        onSubmit: async (e) => {
            e.preventDefault();
            setIsLoading(!isLoading);

            const loginData = {
                username: username,
                password: password
            }
            console.log(loginData);

            if (username !== "admin" || password !== "admin") {
                setTimeout(function () {
                    setIsLoading(isLoading);
                    alert("wrong credentials used");
                }, 3000);

            } else {

                // const userToken = await userLogin(loginData);
                // setToken(userToken.token);

                setTimeout(function () {
                    setToken("sdfgdkjg-sdfg-sfsdfs-sfdsf");
                    setIsLoggedIn(true);
                }, 3000);
            }
        },
    };

    if (registered) {
        return (
            <div className="bx--grid login-page__container">
                <div className="bx--row">
                    <div className="bx--col-lg-8">
                        <h1>Log in</h1>
                        <p>
                            <Information20 className="login-centered-icon" /> Don't have an account?
                            <Link onClick={() => setRegistered(false)}> Sign Up</Link>
                        </p>

                        <Form {...formProps}>
                            <FormGroup legendText="">
                                <TextInput
                                    invalidText="Invalid error message."
                                    labelText="User Name"
                                    placeholder="enter username "
                                    id="username"
                                    onChange={evt => setUsername(evt.target.value)}
                                    required
                                />
                                <br />
                                <TextInput.PasswordInput
                                    invalidText="Invalid error message."
                                    labelText="Password"
                                    placeholder="enter password"
                                    id="password"
                                    onChange={evt => setPassword(evt.target.value)}
                                    required
                                />
                            </FormGroup>

                            {isLoading ?
                                <>
                                    <Loading
                                        description="loading"
                                        withOverlay={false}
                                        small
                                        className="login-centered-icon"
                                    />
                                    <span> Verifying information</span>
                                </> :
                                <Button
                                    className="submit-button"
                                    kind="primary"
                                    type="submit"
                                    renderIcon={Login24}
                                >
                                    Continue
                        </Button>}

                        </Form>

                    </div>
                </div>
            </div>
        );
    }
    return (<SignUp setRegistered={setRegistered} />);
};

const SignUp = ({ setRegistered }) => {

    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const formProps = {
        onSubmit: async (e) => {
            e.preventDefault();
            setIsLoading(!isLoading);

            const loginData = {
                phone: phone,
                password: password
            }
            console.log(loginData);

            if (phone !== "admin" || password !== "admin") {
                setTimeout(function () {
                    setIsLoading(isLoading);
                    alert("wrong credentials used");
                }, 3000);

            } else {

                // const userToken = await userLogin(loginData);
                // setToken(userToken.token);

                setTimeout(function () {
                    setToken("sdfgdkjg-sdfg-sfsdfs-sfdsf");
                    setRegistered(true);
                }, 3000);
            }
        },
    };

    return (
        <div className="bx--grid login-page__container">
            <div className="bx--row">
                <div className="bx--col-lg-8">
                    <h1>Sign Up</h1>
                    <p>
                        <Information20 className="login-centered-icon" /> Already have an account?
                        <Link onClick={() => setRegistered(true)}> Log In</Link>
                    </p>

                    <Form {...formProps}>
                        <FormGroup legendText="">
                            <TextInput
                                invalidText="Invalid error message."
                                labelText="Phone"
                                placeholder="enter phone number"
                                id="phone_number"
                                onChange={evt => setPhone(evt.target.value)}
                                required
                            />
                            <br />
                            <TextInput.PasswordInput
                                invalidText="Invalid error message."
                                labelText="Password"
                                placeholder="enter password"
                                id="password"
                                onChange={evt => setPassword(evt.target.value)}
                                required
                            />
                        </FormGroup>

                        {isLoading ?
                            <>
                                <Loading
                                    description="loading"
                                    withOverlay={false}
                                    small
                                    className="login-centered-icon"
                                />
                                <span> loading, please be patient</span>
                            </> :
                            <Button
                                className="submit-button"
                                kind="primary"
                                type="submit"
                                renderIcon={Login24}
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

SignUp.propTypes = {
    setRegistered: PropTypes.func.isRequired
}

export default Login;