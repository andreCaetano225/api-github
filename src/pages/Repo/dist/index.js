"use strict";
exports.__esModule = true;
exports.Repo = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var styles_1 = require("./styles");
var react_router_dom_2 = require("react-router-dom");
var logo_svg_1 = require("../../assets/logo.svg");
var fi_1 = require("react-icons/fi");
var api_1 = require("../../services/api");
exports.Repo = function () {
    //Recebendo dados API sem usar algum formulario
    var _a = react_1["default"].useState(null), repository = _a[0], setRepository = _a[1];
    var _b = react_1["default"].useState([]), issues = _b[0], setIssues = _b[1];
    var params = react_router_dom_1.useRouteMatch().params;
    react_1["default"].useEffect(function () {
        api_1.api
            .get("repos/" + params.repository)
            .then(function (response) { return setRepository(response.data); });
        api_1.api
            .get("repos/" + params.repository + "/issues")
            .then(function (response) { return setIssues(response.data); });
    }, [params.repository]);
    //---------------------------------------------
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(styles_1.Header, null,
            react_1["default"].createElement("img", { src: logo_svg_1["default"], alt: "Git" }),
            react_1["default"].createElement(react_router_dom_2.Link, { to: "/" },
                react_1["default"].createElement(fi_1.FiChevronLeft, null),
                "Voltar")),
        repository && (react_1["default"].createElement(styles_1.RepoInfo, null,
            react_1["default"].createElement("header", null,
                react_1["default"].createElement("img", { src: repository.owner.avatar_url, alt: repository.owner.login }),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("strong", null, repository.full_name),
                    react_1["default"].createElement("p", null, repository.description))),
            react_1["default"].createElement("ul", null,
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement("strong", null, repository.stargazers_count),
                    react_1["default"].createElement("span", null, "Stars")),
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement("strong", null, repository.forks_count),
                    react_1["default"].createElement("span", null, "Forks")),
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement("strong", null, repository.open_issues_count),
                    react_1["default"].createElement("span", null, "Issues abertas"))))),
        react_1["default"].createElement(styles_1.Issues, null, issues.map(function (issue) { return (react_1["default"].createElement("a", { href: issue.html_url, key: issue.id },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("strong", null, issue.title),
                react_1["default"].createElement("p", null, issue.user.login)),
            react_1["default"].createElement(fi_1.FiChevronRight, { size: 20 }))); }))));
};
