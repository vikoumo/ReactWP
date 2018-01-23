import React, {Component} from 'react';
import {render} from 'react-dom';
// react-router
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
// demo
import RouterPage from './../stage/ReactRouter4Base';
import ReactSpecifically from './../stage/ReactSpecifically';

const PrimaryLayout = () => <switch>
    <Route path="/" exact={true} component={HomePage} />
    <Route path="/ReactRouter4" component={RouterPage} />
    <Route path="/ReactSpecifically" component={ReactSpecifically} />
</switch>;

const HomePage = () => <div>
    <header>All demo</header>
    <ul>
        <li>
            <Link to="/ReactRouter4">react router 4 base</Link>
        </li>
        <li>
            <Link to="/ReactSpecifically">ReactSpecifically: react different js and es6</Link>
        </li>
    </ul>
</div>;

const App = () => <BrowserRouter>
    <PrimaryLayout />
</BrowserRouter>;

render(<App />, document.getElementById('app'));
