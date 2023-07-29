"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');











const MensagemSchema = new (0, _mongoose.Schema)({
  texto: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  remetente: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  destinatario: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

MensagemSchema.statics.buscaChat = function (
  idUsuarioLogado,
  idUsuarioChat
) {
  return this.find({
    $or: [
      {
        $and: [{ remetente: idUsuarioLogado }, { destinatario: idUsuarioChat }],
      },
      {
        $and: [{ remetente: idUsuarioChat }, { destinatario: idUsuarioLogado }],
      },
    ],
  });
};

exports. default = _mongoose.model("Mensagem", MensagemSchema);
