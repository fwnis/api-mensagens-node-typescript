import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import usuarioRoute from "./routes/usuario.route";
import mensagemRoute from "./routes/mensagem.route";

export class App {
  private express: express.Application;
  private port = process.env.PORT ? Number(process.env.PORT) : 3333;

  constructor() {
    this.express = express();
    this.middeware();
    this.database();
    this.routes();
    this.listen();
  }

  public getApp(): express.Application {
    return this.express;
  }

  private middeware(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Server started on port: ${this.port}`);
    });
  }

  private database(): void {
    mongoose.connect(
      "mongodb+srv://eduardofanis:221035@cluster0.lqdk9s3.mongodb.net/?retryWrites=true&w=majority"
    );
  }
  private routes(): void {
    this.express.use("/usuarios", usuarioRoute);
    this.express.use("/mensagens", mensagemRoute);
  }
}
