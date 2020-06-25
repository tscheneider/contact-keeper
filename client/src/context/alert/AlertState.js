/* React - Padrão do react, useReducer - utiliza o Reducer */
import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
//import uuid from 'uuid'
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../type";

const AlertState = (props) => {
  //inicializa com o estado vazio
  const initialState = [];
  //atualiza o estado atual
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //Colocar alerta
  const setAlert = (msg, type, timeout = 5000) => {
    //  const id = uui.v4();
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
