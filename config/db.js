//importa o banco mongo db
const mongoose = require("mongoose");
//organiza configurações
const config = require("config");
//vamos inicializar a variavel bd e trazemos o mongodb
const db = config.get("mongoURI"); /* a URL está em default.json*/

/* Função que conecta a aplicação ao banco de dados */
const connectDB = async () => {
  //retorna uma promessa
  try {
    /* Conecta com o mongo DB */
    await mongoose.connect(db, {
      //evita avisos de versão do mongodb
      useNewUrlParser: true, //sinalizador para permitir que os usuários voltem ao analisador antigo se encontrarem um erro no novo analisador
      useCreateIndex: true, // Falso por padrão. Evita avisos de descontinuação do driver MongoDB.
      useFindAndModify: false, // True por padrão. Define como false para criar findOneAndUpdate()e findOneAndRemove()
      useUnifiedTopology: true, //Falso por padrão. Define para true optar por usar o novo mecanismo de gerenciamento de conexões do driver MongoDB.
    });

    console.log("MongoDB conectado...");
  } catch (err) {
    console.error(err.message);
    process.exit(1); //encerrará o processo silenciosamente e não haverá chance de se recuperar disso
  }
};

//exportação da conexão com o bd

module.exports = connectDB;
