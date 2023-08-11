import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import usuarioModel from "../models/usuario.model";
import { UsuarioInterface } from "../interfaces/usuario.interface";

class AuthMiddleware {
  public async autorizarUsuarioByToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
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
      const usuarioToken = jwt.verify(token, "SECRET") as UsuarioInterface;
      const usuario = await usuarioModel.findById(usuarioToken._id);

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
  public async verificarToken(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    const token = req.headers["x-access-token"];
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
      const decoded = jwt.verify(token, "SECRET") as UsuarioInterface;
      req.usuario = decoded;
      return res.status(200).send({
        message: "Token válido.",
      });
    } catch (error) {
      return res.status(401).send({
        message: "Token inválido.",
      });
    }
  }

  public async autorizarUsuarioByParams(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const usuario = await usuarioModel.findById(req.params.id);

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

export default new AuthMiddleware();
