"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _usuariomodel = require('../models/usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);


class AuthMiddleware {
   async autorizarUsuarioByToken(
    req,
    res,
    next
  ) {
    const token = req.query.token || req.headers["x-access-token"];
    if (!token) {
      return res.status(401).send({
        message: "Acesso Restrito.",
      });
    }

    if (typeof token !== "string") {
      return res.status(401).send({
        message: "Token inválido.",
      });
    }

    try {
      const usuarioToken = _jsonwebtoken2.default.verify(token, "SECRET") ;
      const usuario = await _usuariomodel2.default.findById(usuarioToken._id);

      if (!usuario) {
        return res.status(400).send({
          message: "Usuário inexistente.",
        });
      }

      req.usuario = usuario;

      return next();
    } catch (error) {
      return res.status(401).send({
        message: "Token inválido.",
      });
    }
  }

   async autorizarUsuarioByParams(
    req,
    res,
    next
  ) {
    try {
      const usuario = await _usuariomodel2.default.findById(req.params.id);

      if (!usuario) {
        return res.status(400).send({
          message: "Usuário inexistente.",
        });
      }

      req.usuarioChat = usuario;

      return next();
    } catch (error) {
      return res.status(401).send({
        message: "Usuário inválido.",
      });
    }
  }
}

exports. default = new AuthMiddleware();
