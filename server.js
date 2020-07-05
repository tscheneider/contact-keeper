/* Parte do backend */
const express = require("express");

const app = express();

<<<<<<< HEAD
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
/* app.get("/", (req, res) =>
=======
app.get("/", (req, res) =>
>>>>>>> parent of 5f83fa7... Prepare for deploy
  res.json({ msg: "Bem vindo a API ContactKeeper..." })
); */

//Define as rotas
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
