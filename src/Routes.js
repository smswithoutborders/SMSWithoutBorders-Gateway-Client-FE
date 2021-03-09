import React from 'react';

import {
    Route,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';

import Login from './content/Login';
import App from './App';

const Routes = (props) => (
    <Router {...props}>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route component={App} />
        </Switch>
    </Router>
);
export default Routes;