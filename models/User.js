/* Esse arquivo tem por objetivo criar um modelo do banco de dados */
//importa o banco de dados
const mongoose = require("mongoose");
//esquema de usuários
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, //o email precisa ser unico
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, //a data atual
  },
});

module.exports = mongoose.model("user", UserSchema);
