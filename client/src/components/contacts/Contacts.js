import React, { Fragment, useContext, useEffect } from "react";
/* Exemplo das transitions em: http://reactcommunity.org/react-transition-group/transition-group */
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";
import ContactContext from "../../context/contact/ContactContext";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  // contacts recerbe os contatos que estão vindo de lá em Contactstates
  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();

    //eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Por favor adicione o contato</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((contact) => (
                /*             Faz com que o item suma devagar */
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
          {/* passa todos os contatos que estão vindo de contacts e apresenta na tela nome */}
          {/*       {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))} */}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
