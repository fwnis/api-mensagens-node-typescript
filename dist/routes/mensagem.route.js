"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _mensagemcontroller = require('../controllers/mensagem.controller'); var _mensagemcontroller2 = _interopRequireDefault(_mensagemcontroller);
var _authmiddleware = require('../middlewares/auth.middleware'); var _authmiddleware2 = _interopRequireDefault(_authmiddleware);

const mensagemRoute = _express.Router.call(void 0, );

mensagemRoute.post(
  "/:id",
  _authmiddleware2.default.autorizarUsuarioByParams,
  _authmiddleware2.default.autorizarUsuarioByToken,
  _mensagemcontroller2.default.enviar
);

mensagemRoute.get(
  "/:id",
  _authmiddleware2.default.autorizarUsuarioByParams,
  _authmiddleware2.default.autorizarUsuarioByToken,
  _mensagemcontroller2.default.listar
);

exports. default = mensagemRoute;
