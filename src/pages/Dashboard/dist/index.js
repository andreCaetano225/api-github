"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Dashboard = void 0;
var react_1 = require("react");
var fi_1 = require("react-icons/fi");
var styles_1 = require("./styles");
var logo_svg_1 = require("../../assets/logo.svg");
var api_1 = require("../../services/api");
var react_router_dom_1 = require("react-router-dom");
exports.Dashboard = function () {
    var _a = react_1["default"].useState(function () {
        var storageRepos = localStorage.getItem('@GitCollection:repositorios'); // Criando o localStorage
        if (storageRepos) {
            return JSON.parse(storageRepos);
        }
        return [];
    }), repos = _a[0], setRepos = _a[1];
    var _b = react_1["default"].useState(''), newRepo = _b[0], setNewRepo = _b[1];
    var _c = react_1["default"].useState(''), inputError = _c[0], setInputError = _c[1];
    react_1["default"].useEffect(function () {
        localStorage.setItem('@GitCollection:repositorios', JSON.stringify(repos));
    }, [repos]);
    function handleInputChange(event) {
        setNewRepo(event.target.value);
    }
    function handleAddRepo(// Função tratando a API DO GITHUB!
    event) {
        return __awaiter(this, void 0, Promise, function () {
            var response, repository;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        if (!newRepo) {
                            setInputError('Informe o username/repositório');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, api_1.api.get("repos/" + newRepo)];
                    case 1:
                        response = _a.sent();
                        repository = response.data;
                        setRepos(__spreadArrays(repos, [repository]));
                        setNewRepo('');
                        return [2 /*return*/];
                }
            });
        });
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("img", { src: logo_svg_1["default"], alt: "GitCollection" }),
        react_1["default"].createElement(styles_1.Title, null, "Catalogo de reposit\u00F3rios do Github"),
        react_1["default"].createElement(styles_1.Form, { hasError: Boolean(inputError), onSubmit: handleAddRepo },
            react_1["default"].createElement("input", { type: "text", placeholder: "username/repository_name", onChange: handleInputChange }),
            react_1["default"].createElement("button", { type: "submit" }, "Buscar")),
        inputError && react_1["default"].createElement(styles_1.Error, null, inputError),
        react_1["default"].createElement(styles_1.Repos, null, repos.map(function (repository) { return (react_1["default"].createElement(react_router_dom_1.Link, { to: "/repositories/" + repository.full_name, key: repository.full_name },
            react_1["default"].createElement("img", { src: repository.owner.avatar_url, alt: repository.owner.login }),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("strong", null, repository.full_name),
                react_1["default"].createElement("p", null, repository.description)),
            react_1["default"].createElement(fi_1.FiChevronRight, { size: 20 }))); }))));
};
