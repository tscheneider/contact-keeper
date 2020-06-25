/* Requeremos o express para que seja possivel utilizar o roteamento */
const express = require("express");
/* cria-se uma variavel chamada router e nelas será adicionado o roteador do express */
const router = express.Router();
/* importa a biblioteca de criptografia */
const bcrypt = require("bcryptjs"); //responsavel pela criptografia
//responsavel por criar novos tokens
const jwt = require("jsonwebtoken");
/* realiza a validaçõe e verifica campos */
const { check, validationResult } = require("express-validator");
//o config permite que acessamos o default.json que possui a palavra secreta do token
const config = require("config");
//const { check, validationResult } = require("express-validator/check");

//importa como deve ser o modelo do usuário que está definido models/User
const User = require("../models/User");

//@route      POST api/users
//@desc       Regiter a user
//@access     Public
//Faz a solicitação dos dados no servidor
router.post(
  "/",
  [
    check("name", "Digite um nome").not().isEmpty(), //.not.isEmpty é uma combinação que verifica se o campo está vazio
    check("email", "Por favor, inclua um e-mail valido").isEmail(), // verifica se o item realizado foi digitado em formato de e-mail
    check(
      "password",
      "Por favor, digite uma senha com pelo menos 6 caracteres"
    ).isLength({ min: 6 }), //deixa em formato de senha, ou seja não conseguimos ver o que foi digitado e exige que seja digitado pelo menos 6 caracteres
  ],
  async (req, res) => {
    //res.send("Usuário registrado");
    //res.send(req.body);
    //erros vai receber a validação do request
    const errors = validationResult(req);
    //se o errors foi diferente de vazio apresentará o erro 404(solicitação  incorreta)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //fornece uma matriz com os erros
    }
    //res.send("passed");
    //desestruturando - os arquivos de dentro dos {} correspondem a req.body.nome ...
    const { name, email, password } = req.body;

    try {
      //verifica se há um usuário com esse e-mail. p findOne é um método do mongooose que permite encontrar um usuario atraves de qualquer campo
      let user = await User.findOne({ email }); //essa função é uma promessa
      if (user) {
        // se houver um usuario com esse e-mail, retorna o erro 400 e a mensagem
        return res.status(400).json({ msg: "Esse usuário já existe" });
      }
      /* Se o usuário não existir criaremos um novo usuário */
      user = new User({
        name, //poderiamos escrever name: name, email: email, password: password
        email,
        password,
      });

      /* Antes de salvar o novo usuário criado vamos criptografa-lo */

      //isso definirá o quão segura é a senha (10 é um padrão)
      const salt = await bcrypt.genSalt(10);
      //nos dará a hash da senha onde temos senha e a criptografia criada na linha a cima genSalt
      user.password = await bcrypt.hash(password, salt);
      //salva isso no banco de dados
      await user.save();
      //res.send("Usuário salvo");

      /* cria/envia o token do usuário */
      const payload = {
        //o token do usuário terá seu id
        user: {
          id: user.id,
        },
      };

      /* passamos então o id que virará um token juntaente com a palavra secreta */
      jwt.sign(
        payload,
        config.get(
          "jwtSecret"
        ) /* a palavra secreta permite descriptografar o token. Essa palavra secreta foi definida em default.json */,
        {
          /* O token  termina em 1 hora, ou seja, ficaremos logados por 1 hora */
          expiresIn: 360000,
        },
        (err, token) => {
          /* Caso ocorra algum erro na geração do  token */
          if (err) throw err; /* Se houver um erro retorne o erro */
          res.json({ token });
        }
      );
    } catch (err) {
      /* imprime o erro  */
      console.error(err.message);
      /*retorna erro no servidor */
      res.status(500).send("Erro no servidor");
    }
  }
);

/* para aplicação funcionar deve-se exportar o router como na linha abaixo*/
module.exports = router;
