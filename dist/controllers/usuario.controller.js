"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _usuariomodel = require('../models/usuario.model'); var _usuariomodel2 = _interopRequireDefault(_usuariomodel);
var _mensagemmodel = require('../models/mensagem.model'); var _mensagemmodel2 = _interopRequireDefault(_mensagemmodel);
var _mensagemservice = require('../services/mensagem.service'); var _mensagemservice2 = _interopRequireDefault(_mensagemservice);

class UsuarioControler {
   async cadastrar(req, res) {
    try {
      const { _id, nome } = await _usuariomodel2.default.create(req.body);
      const resposta = {
        message: "Usuário cadastrado com sucesso!",
        _id,
        nome,
      };
      return res.json(resposta);
    } catch (error) {
      return res.status(401).send({
        message: "Usuário já cadastrado.",
      });
    }
  }

   async autenticar(req, res) {
    const { nome, senha } = req.body;

    const usuario = await _usuariomodel2.default.findOne({ nome });
    if (!usuario) {
      return res.status(400).send({ message: "Usuário não encontrado." });
    }

    const senhaValida = await usuario.compararSenhas(senha);
    if (!senhaValida) {
      return res.status(400).send({ message: "Senha incorreta." });
    }

    return res.json({
      usuario,
      token: usuario.gerarToken(),
    });
  }

   getById(req, res) {
    return res.json(req.usuarioChat);
  }

   async listar(req, res) {
    const idUsuarioLogado = req.usuario._id;

    const usuarios = await _usuariomodel2.default.find({
      _id: { $ne: idUsuarioLogado },
    });

    const usuariosMensagem = await Promise.all(
      usuarios.map((usuario) => {
        return _mensagemmodel2.default
          .buscaChat(idUsuarioLogado, usuario._id)
          .sort("-createdAt")
          .limit(1)
          .transform((mensagens) =>
            _mensagemservice2.default.getResultadoMensagemUsuario(mensagens, usuario)
          );
      })
    );

    const mensagensOrdenadas =
      _mensagemservice2.default.retornaMensagensOrdernadas(usuariosMensagem);

    return res.json(mensagensOrdenadas);
  }
}

exports. default = new UsuarioControler();
