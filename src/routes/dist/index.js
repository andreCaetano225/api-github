"use strict";
exports.__esModule = true;
exports.Routes = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Dashboard_1 = require("../pages/Dashboard");
var Repo_1 = require("../pages/Repo");
exports.Routes = function () {
    return (react_1["default"].createElement(react_router_dom_1.Switch, null,
        react_1["default"].createElement(react_router_dom_1.Route, { component: Dashboard_1.Dashboard, path: "/", exact: true }),
        react_1["default"].createElement(react_router_dom_1.Route, { component: Repo_1.Repo, path: "/repositories/:repository+" })));
};
