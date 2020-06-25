//valida tokens
const jwt = require("jsonwebtoken");
//precisamos para acessar a palavra secreta
const config = require("config");

/* Descodifica os tokens criptografados. Essa função também tem acesso a solicitação e respostas dos objetos solicitados*/
module.exports = function (req, res, next) {
  /* exportamos a requisição, a resposta e a próxima parte do middleware */
  //Faz a requisição do token do cabeçalho
  const token = req.header("x-auth-token"); // x-auth-token é a chave do token dentro do cabeçalho

  //verifica se não há token
  if (!token) {
    return res.status(401).json({ msg: "Não há token, autorização negada" });
  }
  try {
    //descodifica as informações necessarias para uma decodificação que são o token
    //e a palavra secreta que está em config > default.json
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //descondifica  o token referente ao usuário (que possui o id ) e atribui para req.user
    req.user = decoded.user;
    next(); //segue para o próximo passo
  } catch (err) {
    //se o token não for descodificado
    //Se ocorrer um erro chama o  catch
    res.status(401).json({ msg: "Token não é valido" });
  }
};
