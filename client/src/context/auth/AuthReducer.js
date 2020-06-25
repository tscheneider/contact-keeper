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

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      /* retorna o token armazenado localmente e o token real */
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload, //token
        isAuthenticated: true, //conjunto autenticado
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      //Em qualquer registro com falha será apontao seu armazenamento local e removido seu token
      localStorage.removeItem("token");
      return {
        ...state,
        token: null, //como o token foi removido ele será null
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
