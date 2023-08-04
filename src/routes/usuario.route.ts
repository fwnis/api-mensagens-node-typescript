import { Router } from "express";
import usuarioController from "../controllers/usuario.controller";
import authMiddleware from "../middlewares/auth.middleware";

const usuarioRoute = Router();

usuarioRoute.post("/cadastro", usuarioController.cadastrar);
usuarioRoute.post("/login", usuarioController.autenticar);
usuarioRoute.post("/autenticar", authMiddleware.autorizarUsuarioByToken);
usuarioRoute.get(
  "/:id",
  authMiddleware.autorizarUsuarioByToken,
  authMiddleware.autorizarUsuarioByParams,
  usuarioController.getById
);
usuarioRoute.get(
  "/",
  authMiddleware.autorizarUsuarioByToken,
  usuarioController.listar
);

export default usuarioRoute;
