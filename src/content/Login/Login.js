import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, TextInput, Button, Loading } from 'carbon-components-react';
import { Login24, Information20 } from '@carbon/icons-react';
import { userLogin, setToken } from '../../services/auth.service';

const Login = ({ setIsLoggedIn }) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const formProps = {
        onSubmit: async (e) => {
            e.preventDefault();
            setIsLoading(!isLoading);
            const loginData = {
                username: username,
                password: password
            }
            const userToken = await userLogin(loginData);
            setToken(userToken.token);
            setIsLoggedIn(true);
        },
    };

    return (
        <div className="bx--grid login-page__container">
            <div className="bx--row">
                <div className="bx--col-lg-8">
                    <h2><strong>Deku SMS Manager</strong></h2>
                    <br />
                    <h3>Log in</h3>
                    <p><Information20 className="login-centered-icon" /> Please use issued credentials</p>

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
};

Login.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired
}

export default Login;