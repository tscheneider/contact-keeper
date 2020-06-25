import axios from "axios";

/* realiza a autenticação do token */
const setAuthToken = (token) => {
  //se houver um token
  if (token) {
    //passa o cabeçalho do token e a chave para identifica-lo que é x-auth-token
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    /* se não houver token neste cabeçalho deletamos o deletamos */
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
