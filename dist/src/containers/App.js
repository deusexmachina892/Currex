"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const Loadable = require("react-loadable");
const Loader_1 = require("../commons/Loader");
// import styles from './styles.css';
const Header_1 = require("../commons/Header");
function slowImport(value, ms = 1000) {
    return new Promise(resolve => {
        setTimeout(() => resolve(value), ms);
    });
}
exports.slowImport = slowImport;
// const HomeLazy = (props) =>{
//     return(
//         <Home />
//     )
// }
// const AdminLazy = (props) =>{
//     return(
//         <Home />
//     )
// }
const HomeLazy = Loadable({
    loader: () => Promise.resolve().then(() => require('../components/Home')),
    loading: Loader_1.default,
});
const AdminLazy = Loadable({
    loader: () => Promise.resolve().then(() => require('../components/Admin')),
    loading: Loader_1.default,
});
class App extends React.Component {
    componentDidMount() {
    }
    render() {
        return (React.createElement("div", { className: 'currEx' },
            React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement("div", null,
                    React.createElement(Header_1.default, null),
                    React.createElement(react_router_dom_1.Switch, null,
                        React.createElement(react_router_dom_1.Route, { path: '/', exact: true, component: HomeLazy }),
                        React.createElement(react_router_dom_1.Route, { path: '/admin', exact: true, component: AdminLazy }))))));
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map