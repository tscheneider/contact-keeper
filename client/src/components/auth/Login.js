import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Credencial invalida") {
      setAlert(error, "danger");
      clearErrors();
    }
    //o comentario abaixo desativa o loop infinito
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log("Submição do Login");
    if (email === "" || password === "") {
      setAlert("Por favor, preencha todos os campos", "danger");
    } else {
      login({
        email,
        password,
      });
    }
  };
  return (
    <div className="form-container">
      <h1>
        Login <span className="text-primary">Conta</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          ></input>
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
