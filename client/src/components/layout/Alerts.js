/* React - importação padrão, useContext - permite a utilização das itens de Alertcontext */
import React, { useContext } from "react";
/* importa os itens de AlertContext */
import AlertContext from "../../context/alert/AlertContext";
/*Cria alertas de erro na aplicação*/

const Alerts = () => {
  /*chama o alertContext que chama itens de alertState */
  const alertContext = useContext(AlertContext);
  return (
    //verifica se o alerts (que está em AlertState) tem tamanho maior que 0, ou seja o estado esteja verdadeiro
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle" /> {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
