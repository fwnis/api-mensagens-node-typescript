"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }





class MensagemService {
   getResultadoMensagemUsuario(
    mensagens,
    usuario
  ) {
    return {
      _id: usuario._id,
      nome: usuario.nome,
      avatar: usuario.avatar,
      ultimaMensagem: _optionalChain([mensagens, 'access', _ => _[0], 'optionalAccess', _2 => _2.texto]) || null,
      dataUltimaMensagem: _optionalChain([mensagens, 'access', _3 => _3[0], 'optionalAccess', _4 => _4.createdAt]) || null,
    };
  }

   retornaMensagensOrdernadas(
    usuariosMensagem
  ) {
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

exports. default = new MensagemService();
