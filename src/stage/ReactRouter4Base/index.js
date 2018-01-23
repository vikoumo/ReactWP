import React, {Component} from 'react';
import {render} from 'react-dom';
// react-router
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
const PrimaryLayout = (props) =>
    <div>
        <header>
            React Router 4 demo
            <Route path="/ReactRouter4/user" component={UsersMenu} />
        </header>
        <ul>
            <li>
            {/* replace（bool）：为 true 时，点击链接后将使用新地址替换掉访问历史记录里面的原地址；
            为 false 时，点击链接后将在原有访问历史记录的基础上添加一个新的纪录。默认为 false */}
                <Link to="/ReactRouter4" replace={true}>Home</Link>
            </li>
            <li>
                <Link to="/ReactRouter4/noExact">NoExact</Link>
            </li>
            <li>
                <Link to="/ReactRouter4/noExact/111">NoExactCopy</Link>
            </li>
            <li>
                <Link to="/ReactRouter4/exact">Exact</Link>
            </li>
            <li>
                <Link to="/ReactRouter4/exact/111">ExactCopy</Link>
            </li>
            <li>
                <Link to="/ReactRouter4/user">User</Link>
            </li>
        </ul>
        <main>
            {/* Switch排他性，匹配出第一个适合的路由 */}
            <Switch>
                {/* exact（bool）：为true时，则要求路径与location.pathname必须完全匹配 */}
                {/* strict（bool）：true的时候，有结尾斜线的路径只能匹配有斜线的location.pathname */}
                <Route path="/ReactRouter4" exact={true} component={HomePage} />

                {/* 没有exact */}
                <Route path="/ReactRouter4/noExact" component={NoExact} />
                <Route path="/ReactRouter4/noExact/:copy" component={NoExactCopy} />
                {/* 有exact */}
                <Route path="/ReactRouter4/exact" exact={true} component={Exact} />
                <Route path="/ReactRouter4/exact/:copy" component={ExactCopy} />
                {/* 嵌套布局 */}
                <Route path="/ReactRouter4/user" component={SubLayout} />

                <Redirect to="/ReactRouter4" />
            </Switch>
        </main>
    </div>;

const HomePage = (route) => {
    console.log(route);
    return (<h1>Home Page</h1>);
};
const SubLayout = (props) => {
    console.log(props);
    return (<div>
        <h1>嵌套布局</h1>
        <Switch>
            {/* match.url 是浏览器 URL 中的实际路径，用于构建嵌套的 <Link>
            而 match.path 是为路由编写的路径.用于构建嵌套的 <Route> */}
            {/* 访问/user时url和path输出一样。在浏览器中访问 /users/5，
            那么 match.url 将是 "/users/5" 而 match.path 将是 "/users/:userId"。 */}
            <Route path={props.match.path} exact={true} component={UsersPage} />
            <Route path={`${props.match.path}/:userId`} component={UsersIdPage} />
        </Switch>
    </div>);
};
const UsersMenu = () => <h1>UsersMenu</h1>;
const UsersPage = () => <h1>User Page</h1>;
const UsersIdPage = ({match}) => <h1>UserId Page<br />userId:{ match.params.userId}</h1>;
const NoExact = () => <h1>NoExact Page</h1>;
const NoExactCopy = () => <h1>NoExactCopy Page</h1>;
const Exact = () => <h1>Exact Page</h1>;
const ExactCopy = () => <h1>ExactCopy Page</h1>;

const RouterPage = () => <BrowserRouter>
    <PrimaryLayout />
</BrowserRouter>;
export default RouterPage;
