import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/ContactContext";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}
        {/* Coloca o tipo e muda as cores do tipo */}
        <span
          /* Deixa os itens no canto direito da tela */
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {/* charAt(0).toUpperCase() pegara a primeira letra e deixará a primeira letra do tipo em maiuscula */}
          {/* type.slice(1) apresentará o resto da palavra menos apartir do caracter 1, ou seja, segundo caractere */}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i>
            {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i>
            {phone}
          </li>
        )}
      </ul>
      <p>
        {/*Ao clicarmos em editar setCurrent irá passar o contato que foi clicado  para o context */}
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(contact)}
        >
          Editar
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.prototypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
