"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _usuariocontroller = require('../controllers/usuario.controller'); var _usuariocontroller2 = _interopRequireDefault(_usuariocontroller);
var _authmiddleware = require('../middlewares/auth.middleware'); var _authmiddleware2 = _interopRequireDefault(_authmiddleware);

const usuarioRoute = _express.Router.call(void 0, );

usuarioRoute.post("/cadastro", _usuariocontroller2.default.cadastrar);
usuarioRoute.post("/login", _usuariocontroller2.default.autenticar);
usuarioRoute.get(
  "/:id",
  _authmiddleware2.default.autorizarUsuarioByToken,
  _authmiddleware2.default.autorizarUsuarioByParams,
  _usuariocontroller2.default.getById
);
usuarioRoute.get(
  "/",
  _authmiddleware2.default.autorizarUsuarioByToken,
  _usuariocontroller2.default.listar
);

exports. default = usuarioRoute;
