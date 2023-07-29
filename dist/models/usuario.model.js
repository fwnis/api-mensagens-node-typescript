"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose');

var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);






const UsuarioSchema = new (0, _mongoose.Schema)({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
});

UsuarioSchema.pre("save", async function criptografarSenha() {
  this.senha = await _bcrypt2.default.hash(this.senha, 8);
});

UsuarioSchema.pre("save", function gerarAvatar() {
  const randomId = Math.floor(Math.random() * 1000000) + 1;
  this.avatar = `https://api.multiavatar.com/${randomId}.svg`;
});

UsuarioSchema.methods.compararSenhas = function (
  senha
) {
  return _bcrypt2.default.compare(senha, this.senha);
};

UsuarioSchema.methods.gerarToken = function () {
  const decodedToken = {
    _id: String(this._id),
    nome: this.nome,
    avatar: this.avatar,
  };

  return _jsonwebtoken2.default.sign(decodedToken, "SECRET", {
    expiresIn: "1d",
  });
};

exports. default = _mongoose.model("Usuario", UsuarioSchema);
