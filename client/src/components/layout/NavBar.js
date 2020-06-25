/** React - Padrão, Fragment - agruppa um conjunto de tag , useContext - tras valores vindo de context*/
import React, { Fragment, useContext } from "react";
/* define o tipo de cada variavel */
import PropTypes from "prop-types";
/** Faz o roteamento entre as páginas */
import { Link } from "react-router-dom";
/* importa o conteúdo de AuthContext */
import AuthContext from "../../context/auth/AuthContext";
/* importa o conteúdo de ContactContext */
import ContactContext from "../../context/contact/ContactContext";

/** Função que cria o navbar para navegação , passa como referência o titulo e o icone*/
const NavBar = ({ title, icon }) => {
  /* Permite que seja possivel usar variaveis e funções de AuthContext.js podemos acessar através de authContext.*/
  const authContext = useContext(AuthContext);
  /* Permite que seja possivel usar variaveis e funções de ContactContext.js podemos acessar através de contactContext.*/
  const contactContext = useContext(ContactContext);
  /* Realiza uma desestruturação, nos locais que teriamos authContext.logout, podemos colocar apenas logout. E assim com as outras variaves  */
  const { isAuthenticated, logout, user } = authContext;
  /* Realiza uma desestruturação, nos locais que teriamos contactContext.clearContacts, podemos colocar apenas clearContacts.   */
  const { clearContacts } = contactContext;

  /* Função para deslogar do sistema */
  const onLogout = () => {
    logout(); //chama a função logout de authState.js através do authContext
    clearContacts(); //chama a função clearContacts de contactState.js através do contactContext
  };
  /** Função do navbar quando o app está logado */
  const authLinks = (
    /** Agrupa itens */
    <Fragment>
      {/* Se existir user (!=null) adicionar user.name (Hello fulano)*/}
      <li> Hello {user && user.name}</li>
      <li>
        {/*  ao clicar em login chama a função onLogout */}
        <a onClick={onLogout} href="#!">
          {/* chama o icone - que não esta funcionando */}
          <i className="fas fa-sign-out-alt"></i>{" "}
          {/* acrescenta o icone de logout = que não funciona e o Logout */}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  /** Função do navbar quando o app está deslogado  */
  const guestLinks = (
    /** Agrupa itens */
    <Fragment>
      {/** Redireciona para a página de Registro de usuário */}
      <li>
        <Link to="/register">Register</Link>
      </li>
      {/** Redireciona para a página de fazer login */}
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    /* formatação css do navbar */
    <div className="navbar bg-primary">
      <h1>
        {/* Adiciona o icone o titulo que estão sendo passados na função */}
        <i className={icon} /> {title}
      </h1>
      <ul>
        {/*         <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li> */}
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

//Define o tipo de cada variavel
NavBar.prototype = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
//Define o valor das variaveis
NavBar.defaultProps = {
  // Define as variaveis
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt",
};

export default NavBar;
