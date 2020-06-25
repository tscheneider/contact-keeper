const express = require("express"); // framework do servidor
const router = express.Router(); // cria manipuladores de rota modulares e montáveis
const bcrypt = require("bcryptjs"); //responsavel pela criptografia
const jwt = require("jsonwebtoken"); //responsavel por criar novos tokens
const { check, validationResult } = require("express-validator"); // validador do express
const config = require("config"); // permite definir um conjunto de parametro e utliza-lo na aplcação
/* chama o midleware que é o responsável pela descodificação do token id do usuário  */
const auth = require("../middleware/auth");
//const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");

//@route      GET api/auth
//@desc       Get logged in user
//@access     Private
/* função que obtem o usuario logado */
// Parametro '/' - caminho
// Parametro auth - verifica a autenticação do token que está em middleware > auth.js
// Parametro (req, res) - Faz a requisição do usuário no bd
router.get("/", auth, async (req, res) => {
  //res.send("Obtem o usuário logado");
  try {
    /* Se enviarmos um token certo e estivermos logados, 
    receberemos um objeto de usuário */
    //busca os dados através req.user.id e adicionamod todos os dados menos a senha na vaviavel user
    const user = await User.findById(req.user.id).select("-password");
    //retorna como resposta o objeto user
    res.json(user);
  } catch (err) {
    //tratamento de erro caso não seja executado os itens a cima
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

//@route      POST api/auth
//@desc       Auth user & get token
//@access     Public
// Loga o usuário no sistema (sutentica e obtem o token para acessar o sistema)
// Parametro '/' - caminho
// Parametro [check, check] - define a checagem da senha e email
// Parametro (req, res) - Faz a requisição do usuário no bd
router.post(
  "/",
  [
    check("email", "Por favor, inclua um email valido").isEmail(), // o email precisa estar no formato de email aaa@aaa.aa
    check("password", "Senha incorreta").exists(), //verifica se a senha corresponde com a do bd
  ],
  async (req, res) => {
    const errors = validationResult(
      req
    ); /* faz a requisição da validação dos resultados (express-validator) */
    if (!errors.isEmpty()) {
      // se o erro for diferente de vazio a resposta será o erro 404( 404 - o servidor não pode encontrar o que foi pedido)
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body; //podemos ver o body no postman
    try {
      let user = await User.findOne({ email }); //Busca o  email do usuario e adiciona na variavel user
      if (!user) {
        //verifica se esse usuario existe e se não existir retorna um usuário existente
        return res.status(400).json({ msg: "Credencial invalida" });
      }
      /* a variavel isMatch recebe se as senha digitada corresponde com a criptografada  */
      const isMatch = await bcrypt.compare(password, user.password); //realiza a comparação da senha do bd com a senha que está sendo passada
      if (!isMatch) {
        //Se as senhas não forem iguais
        return res.status(400).json({ msg: "Credencial invalida" }); // retorna erro 404( 404 - o servidor não pode encontrar o que foi pedido)
      }
      //cria um objeto payload com um objeto de usuario
      const payload = {
        user: {
          id: user.id,
        },
      };
      /* Cria um token valido através de uma palavra secreta */
      jwt.sign(
        payload, //objeto que possui um usuário
        config.get("jwtSecret"), //pega a palavra secreta que pasta config no arquivo default.json
        {
          /* A configuração insíra em 1 hora */
          expiresIn: 360000,
        }, //cria função passando err e token
        (err, token) => {
          if (err) throw err; //se obtiver erro retorna o erro
          res.json({ token }); //tras como resposta o token
        }
      );
    } catch (err) {
      // caso o try não funcione
      console.error(err.message);
      res.status(500).send("Erro no servidor");
    }
  }
);

module.exports = router;
