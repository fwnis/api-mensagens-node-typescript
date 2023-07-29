"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _usuarioroute = require('./routes/usuario.route'); var _usuarioroute2 = _interopRequireDefault(_usuarioroute);
var _mensagemroute = require('./routes/mensagem.route'); var _mensagemroute2 = _interopRequireDefault(_mensagemroute);

 class App {
  
   __init() {this.port = process.env.PORT ? Number(process.env.PORT) : 3333}

  constructor() {;App.prototype.__init.call(this);
    this.express = _express2.default.call(void 0, );
    this.middeware();
    this.database();
    this.routes();
    this.listen();
  }

   getApp() {
    return this.express;
  }

   middeware() {
    this.express.use(_express2.default.json());
    this.express.use(_cors2.default.call(void 0, ));
  }

   listen() {
    this.express.listen(this.port, () => {
      console.log(`Server started on port: ${this.port}`);
    });
  }

   database() {
    _mongoose2.default.connect(
      "mongodb+srv://eduardofanis:ESaa4SrkRzPFyt8Z@cluster0.lqdk9s3.mongodb.net/cluster0?retryWrites=true&w=majority"
    );
  }
   routes() {
    this.express.use("/usuarios", _usuarioroute2.default);
    this.express.use("/mensagens", _mensagemroute2.default);
  }
} exports.App = App;
