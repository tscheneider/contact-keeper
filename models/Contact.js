const mongoose = require("mongoose");

//esquema dos contatos, define as informações que os contatos de cada usuário tem
const ContactSchema = mongoose.Schema({
  /* é uma chave secundaria, como cada usuário possui seus contatos
  temos que ter o user relacionado nesta tabela */
  user: {
    type: mongoose.Schema.Types.ObjectId, // Para especificar um tipo de ObjectId
    ref: "users", //temos que dar a referencia de qual coleção de dados estamos falando
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: "personal",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("contact", ContactSchema);
