/* Parte do backend */
/* Esse projeto será criado com API utilizando NodeExpress e MongoDB Atlas (online) */
/* o Primeiro passo para iniciar esse projeto é  criar um arquivo em https://www.mongodb.com/, 2 - cria um cruster, 
    3 - crie um user (add new user), 4 - adicionamos endereço de IP (add whitelist Entry) 0.0.0.0/0 */
/*  Baixe o app Postman para a realização dos testes  */
/* Instalamos:  npm init -y, que criará o package.json, onde atualizaremos o main para "main": "server.js" */
/* Instalamos as dependências regulares: npm i express bcryptjs jsonwebtoken config express-validator mongoose */
/* Instalamos as dependências Dev: npm i -D nodemon concurrently */
/* Em package.json dentro de "script" troca test para "start": "node server.js", "server": "nodemon server.js" */

/*  express framework que simula um servidor da web  */
const express = require("express"); //importa o módulo Express principal do pacote que foi instado
//importa os componentes debd.js (que está realizando a conexão com o banco de dados)
const connectDB = require("./config/db");
//utilizado para colocar no servidor do heroku
const path = require("path");

const app = express(); //inicializando o express para criar a variavel app

//conecta com o banco de dados
connectDB();

//inicializa o Middleware
app.use(express.json({ extended: false }));

/* Essa parte do código é onde dizemos ao nosso servidor Express como lidar com uma
 GETsolicitação ao nosso servidor. */
/* Parametro '/' - URL define onde a função atuara.
  Nesse caso, estamos segmentando '/', que é a raiz do nosso site: neste caso localhost:5000 
  Parametro (req, res) - é uma função com dois argumentos: req e res
  req - representa a solicitação que foi enviada ao servidor (pode ser usado para ler os dados que estão sendo requisitados)
  res - representa a resposta que enviaremos de volta ao cliente. */
app.get("/", (req, res) =>
  res.json({ msg: "Bem vindo a API ContactKeeper..." })
);

//Define as rotas elas são requeridas sa pasta routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

/* Porta padrão ou porta 5000 */
const PORT = process.env.PORT || 5000; //porta que será passada para listen

//ativos estáticos do servidor em produção (colocando no servidor do heroku)
if (process.env.NODE_ENV === "production") {
  //define pasta estética
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

//função que informa ao aplicativo em qual porta escutar.
/* O primeiro parametro é a porta definida anteriormente
A função transmitida como o segundo parâmetro é opcional e é executada quando o servidor é iniciado. 
Isso nos dá algum feedback no console para saber que nosso aplicativo está sendo executado. */
app.listen(PORT, () => console.log(`Servidor inicializado na porta ${PORT}`));

/* Para inicializar apenas o sevidor npm run server */
