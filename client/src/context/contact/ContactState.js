//React - import padrão,  useReducer - importa o estados dos reducer
import React, { useReducer } from "react";
// responsavel por criar a API que liga o back e o front
import axios from "axios";
//
//import { v4 as uuidv4 } from "uuid";
import ContactContext from "./ContactContext";
//importa os case de cada ações
import ContactReducer from "./ContactReducer";
//importa as ações de type
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from "../type";

const ContactState = (props) => {
  //inicia o estado
  const initialState = {
    //a aplicação inicia sem nenhum contato
    contacts: null,
    /* contacts: [
      {
        id: 1,
        name: "Jill Johnson",
        email: "jill@gmail.com",
        phone: "111-111-111",
        type: "personal",
      },
      {
        id: 2,
        name: "Sara Watson",
        email: "sara@gmail.com",
        phone: "222-222-222",
        type: "personal",
      },
      {
        id: 3,
        name: "Harry White",
        email: "harry@gmail.com",
        phone: "333-111-111",
        type: "professional",
      },
    ], */
    /* Quando clicarmos em editar o nosso contato será colocado em current */
    current: null,
    /* filtro de contatos */
    filtered: null,
    /* erros */
    error: null,
  };

  /* permite o envio do novo estado para o ContactReducer  */
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //obtem contato
  const getContacts = async () => {
    try {
      //traz como respostas a api/contacts que vem de server.js
      const res = await axios.get("/api/contacts");
      //envia para o reducer a ação GET_CONTACTS e envia as resposta com os dados
      dispatch({ type: GET_CONTACTS, payload: /*contact*/ res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Adiciona o contato
  //Essa função acessará a API e adicionará os contatos no banco de dados
  const addContact = async (contact) => {
    //gera um valor aleatorio de id, v4 = versão 4
    //contact.id = uuidv4();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/contacts", contact, config);
      //envia para o reducer
      dispatch({ type: ADD_CONTACT, payload: /*contact*/ res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };
  //Deleta o contato
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      //envia para o reducer
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Limpar Contatos
  const clearContacts = () => {
    //envia para o reducer
    dispatch({ type: CLEAR_CONTACT });
  };

  //Definir contato atual
  const setCurrent = (contact) => {
    //envia para o reducer
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //Limpar contato atual
  const clearCurrent = () => {
    //envia para o reducer
    dispatch({ type: CLEAR_CURRENT });
  };

  //Atualizar contato
  const updateContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      //envia para o reducer
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };
  //Filtrar contato
  const filterContacts = (text) => {
    //envia para o reducer
    dispatch({ type: FILTER_CONTACT, payload: text });
  };
  //Limpar filtro
  const clearFilter = () => {
    //envia para o reducer
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
