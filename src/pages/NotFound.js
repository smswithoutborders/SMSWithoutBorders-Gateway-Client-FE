import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from 'carbon-components-react';

const NotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <h1>404</h1>
            <p>Oops seems you hit a dead end</p>
            <Button onClick={() => navigate(-1)}>return</Button>
        </div>
    )
}

export default NotFound;