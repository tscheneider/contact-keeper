import React, { useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/AuthContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  /*  */
  useEffect(() => {
    /* Chama o usuário que já está logado */
    authContext.loadUser();

    // eslint-disable-next-line
  }, []);
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        {/*Apresenta os contatos em tela */}
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
