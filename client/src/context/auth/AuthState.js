/* React - import padrão, useReducer - Permite*/
import React, { useReducer } from "react";
/* axios constoi uma api para busca de dados */
import axios from "axios";
/* importa o AuthContext */
import AuthContext from "./AuthContext";
/* importa os itens de Auth Reducer */
import AuthReducer from "./AuthReducer";
import setAuthToken from "../../utils/setAuthToken";
/* importa os itens de type */
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../type";

const AuthState = (props) => {
  /* quando incilializa o estado */
  const initialState = {
    //token sendo armazenado localmente
    token: localStorage.getItem("token"),
    //define se estamos logados ou não
    isAuthenticated: null,
    //Define qual usuário
    user: null,
    //tempo para o caarregamento dos dados
    loading: true,
    //caso haja um erro no carregamento
    error: null,
  };

  /* atualiza os estados do reducer  */
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //carregamentoo do usuário
  //verifica qual usuário está sendo carregado
  const loadUser = async () => {
    //@todo - carregar token em cabeçalhos globais (ele fará isso em setAuthToken)
    //verifica se há o token do armazenamento local
    if (localStorage.token) {
      //faz o carregamento do token
      setAuthToken(localStorage.token);
    }
    try {
      //tras como resposta o usuário que está autenticado de server.js
      const res = await axios.get("/api/auth");
      /* Passa para reducer a ação USER_LOADED e os dados de resposta  */
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      /* Passa o AUTH_ERROR para o reducer  */
      dispatch({ type: AUTH_ERROR });
    }
  };

  //registra usuários
  //registra o usuário para que receba um token como retorno
  const register = async (formData) => {
    //cabeçalho do tipo de aplicativo json
    //objeto de configuração
    const config = {
      /* objeto de cabeçalho que inclui nos relatorios */
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //esses dados vem do back-end, esta retornando como resposta uma promessa que vem do proxy que busca os dados de routes > auth.js
      const res = await axios.post("/api/users", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //login usuário
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //esses dados vem do back-end
      const res = await axios.post("/api/auth", formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //logout
  const logout = () =>
    dispatch({
      type: LOGOUT,
    });

  //clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
