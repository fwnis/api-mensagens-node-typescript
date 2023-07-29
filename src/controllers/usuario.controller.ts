import { Request, Response } from "express";
import usuarioModel from "../models/usuario.model";
import mensagemModel from "../models/mensagem.model";
import mensagemService from "../services/mensagem.service";

class UsuarioControler {
  public async cadastrar(req: Request, res: Response): Promise<Response> {
    try {
      const { _id, nome } = await usuarioModel.create(req.body);
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

  public async autenticar(req: Request, res: Response): Promise<Response> {
    const { nome, senha } = req.body;

    const usuario = await usuarioModel.findOne({ nome });
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

  public getById(req: Request, res: Response): Response {
    return res.json(req.usuarioChat);
  }

  public async listar(req: Request, res: Response): Promise<Response> {
    const idUsuarioLogado = req.usuario._id;

    const usuarios = await usuarioModel.find({
      _id: { $ne: idUsuarioLogado },
    });

    const usuariosMensagem = await Promise.all(
      usuarios.map((usuario) => {
        return mensagemModel
          .buscaChat(idUsuarioLogado, usuario._id)
          .sort("-createdAt")
          .limit(1)
          .transform((mensagens) =>
            mensagemService.getResultadoMensagemUsuario(mensagens, usuario)
          );
      })
    );

    const mensagensOrdenadas =
      mensagemService.retornaMensagensOrdernadas(usuariosMensagem);

    return res.json(mensagensOrdenadas);
  }
}

export default new UsuarioControler();
