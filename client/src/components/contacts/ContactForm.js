import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, clearCurrent, current } = contactContext;

  /* Preenche os itens no formulário quando clicamos em editar */
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  //pega e.target.name de dentro dos inputs abaixo
  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    //Como utilizamos o mesmo botão para adicionar e editar, precisamos
    // verificar se algum contato está sendo editado.
    //Podemos fazer isso verificando se a variavel current, utilizada para armazenar
    //o item que será editado está vazio ou não
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
    /*     setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    }); */
  };
  /* Limpa os itens do formulario  */
  const clearAll = () => {
    clearCurrent();
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Editar Contato" : "Adicionar Contato"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Tipo de contato</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value={current ? "Atualizar Contato" : "Adicionar Contato"}
          className="btn btn-primary btn-block"
          onChange={onChange}
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Limpar
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
