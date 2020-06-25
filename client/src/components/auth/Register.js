/* React - Padrão, useState - , useEffect -  */
import React, { useState, useContext, useEffect } from "react";
/* Cria um alerta caso algo esteja errado */
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  /* desestruturação de alertContext.setAlert */
  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  /* essa função é executada depois que a renderização estiver disponivel na tela */
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    /** verifica se o error é o de "Esse usuário já existe" */
    if (error === "Esse usuário já existe") {
      //chama a função setAlert de alertContext
      setAlert(error, "danger"); //erro e tipo de perigo
      //chama authcontext. clearErrors
      clearErrors();
    }
    //o comentario abaixo desativa o loop infinito gerado em isAuthenticated
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  /* estado inicial das variaveis do usuario */
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "", //confirmação da senha
  });

  //desestrutura o user.name
  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    //caso algum campo esteja vazio, chama o setAlert de alertContext
    if (name === "" || email === "" || password === "") {
      setAlert("Por favor preencha todos os campos", "danger");
      //se a senha 1 difrente de senha 2, chama o setAlert de alertContext
    } else if (password !== password2) {
      setAlert("As senhas não são iguais", "danger");
    } else {
      //console.log("Registro realizado");
      //chama o register de authContext, passando o nome, email e senha
      register({
        name,
        email,
        password,
      });
    }
  };
  return (
    /* Criando o formulario de um novo cadastro  */
    <div className="form-container">
      <h1>
        Registro <span className="text-primary">Conta</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            /* Cria um balão de comunicação quando vc passa o mouse em cima com "Preencha esse campo" */
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            /* Não vai permitir que a senha tenha menos de 6 digitos */
            minLength="6"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirme sua Senha</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="6"
          ></input>
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
