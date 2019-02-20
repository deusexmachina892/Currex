"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
class Header extends React.PureComponent {
    render() {
        return (React.createElement("div", null,
            "Header",
            React.createElement(react_router_dom_1.Link, { to: '/' }, "Home"),
            React.createElement(react_router_dom_1.Link, { to: '/admin' }, "Admin")));
    }
}
exports.default = Header;
//# sourceMappingURL=Header.js.map