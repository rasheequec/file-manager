import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../services/auth.service';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            AuthService.IsLoggedIn() ?
                <Component {...props} {...rest} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;