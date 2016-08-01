import React from 'react';
import { Route, NotFoundRoute, Redirect, DefaultRoute } from 'react-router';
import App from './App';
import Main from './views/Main';

export default (
    <Route component={App}>
	<Route name="main" component={Main} path="/" />
        <Redirect from="/index.html" to="/"/>
        <Redirect from="/*/" to="/*"/>
    </Route>
);
