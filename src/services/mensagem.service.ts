import { MensagemInterface } from "../interfaces/mensagem.interface";
import {
  MensagemUsuario,
  UsuarioInterface,
} from "../interfaces/usuario.interface";

class MensagemService {
  public getResultadoMensagemUsuario(
    mensagens: MensagemInterface[],
    usuario: UsuarioInterface
  ): MensagemUsuario {
    return {
      _id: usuario._id,
      nome: usuario.nome,
      avatar: usuario.avatar,
      ultimaMensagem: mensagens[0]?.texto || null,
      dataUltimaMensagem: mensagens[0]?.createdAt || null,
    };
  }

  public retornaMensagensOrdernadas(
    usuariosMensagem: MensagemUsuario[]
  ): MensagemUsuario[] {
    return usuariosMensagem.sort((a, b) => {
      if (a.dataUltimaMensagem && b.dataUltimaMensagem) {
        return (
          (a.dataUltimaMensagem ? 0 : 1) - (b.dataUltimaMensagem ? 0 : 1) ||
          -(a.dataUltimaMensagem > b.dataUltimaMensagem) ||
          +(a.dataUltimaMensagem < b.dataUltimaMensagem)
        );
      } else {
        return 0;
      }
    });
  }
}

export default new MensagemService();
