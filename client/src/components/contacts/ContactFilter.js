import React, { useContext, useRef, useEffect } from "react";
//import ContactState from "../../context/contact/ContactState";
import ContactContext from "../../context/contact/ContactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  //useRef é como uma “caixa” que pode conter um valor mutável em sua propriedade .current
  const text = useRef("");

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value) {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filtrar Contatos..."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
