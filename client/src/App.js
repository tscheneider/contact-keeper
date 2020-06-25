/* React - import Padrão, Fragmment - agrupa um conjunto de tags (similar a div) */
import React, { Fragment } from "react";
/* Para instalar:  npm install --save react-router-dom
  A <BrowserRouter> é um componente de roteador que usa caminhos de URL regulares. Esses geralmente são os URLs mais bonitos, mas exigem que o servidor esteja configurado corretamente.
  Existem dois componentes correspondentes de rota: Switch Route.7
  Quando um <Switch> é renderizado, ele pesquisa seus filhos <Route> elementos para encontrar um que corresponda ao caminho da URL atual. 
  Quando encontra um, processa <Route> e ignora todos os outros. Isso significa que deve-se colocar <Route>s específicos (geralmente mais longos). 
  <Router> É a interface de baixo nível comum para todos os componentes do roteador. 
  */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
/* Importa itens do navbar */
import Navbar from "./components/layout/NavBar";
/* Importa itens do home */
import Home from "./components/pages/Home";
/* Importa itens do about */
import About from "./components/pages/About";
/* Importa itens do register */
import Register from "./components/auth/Register";
/* Importa itens do login */
import Login from "./components/auth/Login";
/* Importa itens do alert */
import Alerts from "./components/layout/Alerts";
/* Importa itens do ContactState */
import ContactState from "./context/contact/ContactState";
/* Importa itens do AuthState */
import AuthState from "./context/auth/AuthState";
/* Importa itens do PrivateRoute */
import PrivateRoute from "./components/routing/PrivateRoute";
/* Importa itens do AlertState */
import AlertState from "./context/alert/AlertState";
/* Importa itens do setAuthToken */
import setAuthToken from "./utils/setAuthToken";
/* Importa todo o css */
import "./App.css";

/* Se tiver um token armazenado localmente chamaremos a função 
setAuthToken. Que é a responsável por realizar a autenticação do token */
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

/* Principal função da aplicação ela é chamada em index.js e traz as respostas das demais funções */
const App = () => {
  return (
    /* chama os itens de AuthState responsavel pela autenticação dos usuários */
    <AuthState>
      {/* */}
      <ContactState>
        {/* */}
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                {/* Se não houver <Route> correspondência, a <Switch> renderização nada (null). */}
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
