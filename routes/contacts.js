/* framework do servidor */
const express = require("express");
/* cria as rotas so servidor */
const router = express.Router();
/* descriptografa os tokens  */
const auth = require("../middleware/auth");
/* realiza a validação dos itens do servidor  */
const { check, validationResult } = require("express-validator");
/* tras o modelo dos Usuários de que está sendo buscados do bd através do arquivo User */
const User = require("../models/User");
/* tras o modelo dos Contatos de que está sendo buscados do bd através do arquivo User */
const Contact = require("../models/Contact");

//@route      GET api/contacts
//@desc       Get all users contacts
//@access     Private (auth)
//Da forma como está construido só será possivel visualizar o contato se vc estiver logado (auth)
//Obtem os contatos do banco de dados
router.get("/", auth, async (req, res) => {
  //res.send("Obter todos os contatos");
  try {
    /* encontra o contato atraves daa requisição req.user.id e armazena em contacts */
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1, //organiza os contatos trazendo o mais recente primeiro
    });
    res.json(contacts); //tras como resposta um vetor [] com os contatos
  } catch (err) {
    //se ouver algum erro no processo do try, será apresentada uma mensagem de erro
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

//@route      POST api/contacts
//@desc       Add new contact
//@access     Private
//Adiciona um novo contato
//auth [] - vetor de contatos autenticados
//check() - verifica se há um nome no contato
router.post(
  "/",
  [
    auth,
    [check("name", "Nome requirido").not().isEmpty()],
  ] /* torna nome um campo obrigatorio */,
  async (req, res) => {
    //res.send("Adiciona contatos");
    //Extrai os erros de validação de uma solicitação e os disponibiliza em erros
    const errors = validationResult(req);
    //isEmpty retorna um booleano indicando se esse objeto de resultado não contém erros.
    if (!errors.isEmpty()) {
      /* verifica se há erros */
      /* Se houver retorna como resposta erro 400 e uma matriz de erros de validação */
      return res.status(400).json({ errors: errors.array() });
    }

    //desestruração do req.body (red.body.name troca por name)
    const { name, email, phone, type } = req.body;

    try {
      /* Cria um novo contato */
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id, //o auth logado vai especificar qual usuario esta requerindo o contato
      });

      //Cria uma nova instancia de contato e salva o novo contato no bd
      const contact = await newContact.save();
      //retorna o novo contato para a  parte do cliente
      res.json(contact);
    } catch (err) {
      // se houver algum erro, retorna uma mensagem de erro
      console.error(err.message);
      //erro 500 (erro ao acessar o servidor)
      res.status(500).send("Erro no servidor");
    }
  }
);

//@route      PUT api/contacts/:id
//@desc       Update contact
//@access     Private
//Atualiza um contato existente. Essa atualização é buscada através do número de id
router.put("/:id", auth, async (req, res) => {
  // res.send("Atualizar contatos");

  const { name, email, phone, type } = req.body;

  //Constroi o objeto contact
  const contactFields = {};
  //verifica se o camo foi swlwcionado e se sim, atribui os tipos de campos aos campos
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    //encontramos o contato que sera editado e qual o parametro
    let contact = await Contact.findById(req.params.id);
    if (!contact)
      //se não houver esse contato na lista retorna uma mensagem de erro
      return res.status(404).json({ msg: "Contato não encontrado" });
    //Faz a garantia que o contato pertence aquele usuário
    if (contact.user.toString() !== req.user.id) {
      //verifica se o contato do usuário é diferente do token do usuario
      //Se não pertencer retorna uma mensagem de erro
      return res.status(401).json({ msg: "Não autorizado " });
    }
    /* realiza atualização */
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true } /* Se este contato não existir ele será criado */
    );

    res.json(contact); //retorna como resposta o contact
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

//@route      DELETE api/contacts/:id
//@desc       Delete contact
//@access     Private
//Deleta o contato. A busca do contato deletado é realizado através do id
router.delete("/:id", auth, async (req, res) => {
  // res.send("Delete contatos");

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact)
      return res.status(404).json({ msg: "Contato não encontrado" });
    //Verifica se o usuário possui contatos
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Não autorizado " });
    }
    /*Remove o contato */
    await Contact.findByIdAndRemove(req.params.id);

    /* Retorna como resposta aremoção do contato */
    res.json({ msg: "Remover contato" });
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Erro no servidor");
  }
});
module.exports = router;
