import React, {Component} from 'react';
import {render} from 'react-dom';
// react-router
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
// demo
import RouterPage from '@/stage/ReactRouter4Base';
import ReactSpecifically from '@/stage/ReactSpecifically';
import CurryingModule from '@/stage/CurryingModule';
import ImmutabilityHelper from '@/stage/ImmutabilityHelper';
import Decorator from '@/stage/Decorator';

const PrimaryLayout = () => <switch>
    <Route path="/" exact={true} component={HomePage} />
    <Route path="/ReactRouter4" component={RouterPage} />
    <Route path="/ReactSpecifically" component={ReactSpecifically} />
    <Route path="/CurryingModule" component={CurryingModule} />
    <Route path="/immutability-helper" component={ImmutabilityHelper} />
    <Route path="/decorator" component={Decorator} />
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
        <li>
            <Link to="/CurryingModule">Currying and Partial Application: 柯里化和偏函数应用</Link>
        </li>
        <li>
            <Link to="/immutability-helper">immutability-helper</Link>
        </li>
        <li>
            <Link to="/decorator">decorator</Link>
        </li>
    </ul>
</div>;

const App = () => <BrowserRouter>
    <PrimaryLayout />
</BrowserRouter>;

render(<App />, document.getElementById('app'));
