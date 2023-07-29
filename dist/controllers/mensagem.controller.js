"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _mensagemmodel = require('../models/mensagem.model'); var _mensagemmodel2 = _interopRequireDefault(_mensagemmodel);

class MensagemController {
   async enviar(req, res) {
    const mensagem = await _mensagemmodel2.default.create({
      texto: req.body.texto,
      remetente: req.usuario._id,
      destinatario: req.usuarioChat._id,
    });
    return res.json(mensagem);
  }

   async listar(req, res) {
    const idUsuarioLogado = req.usuario._id;
    const idUsuarioChat = req.usuarioChat._id;

    const mensagens = await _mensagemmodel2.default
      .buscaChat(idUsuarioLogado, idUsuarioChat)
      .sort("createdAt");

    const mensagensChat = mensagens.map((mensagem) => {
      return {
        texto: mensagem.texto,
        createdAt: mensagem.createdAt,
        isRemetente: String(mensagem.remetente) === String(idUsuarioLogado),
      };
    });
    return res.json(mensagensChat);
  }
}

exports. default = new MensagemController();
