import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            <Component {...props} {...rest} />
        )} />
    );
};

export default PublicRoute;