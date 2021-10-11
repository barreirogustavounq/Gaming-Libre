import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { loginAction } from "../Redux/UserDuck";
import "../../style/Login.css";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { logInService } from "../../service/UserService";

const Login = ({ loginAction, user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }
  useEffect(() => {
    if (user.loggedIn) {
      history.push("/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    logInService(username, password, user, setError, loginAction);
  };

  return (
    <div className="Login">
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Form.Group size="lg" controlId="email">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Iniciar Sesión
        </Button>
        <Alert className="alertButton" variant={error ? "danger" : "secondary"}>
          <Alert.Heading>
            {error
              ? "Usuario y/o contraseña incorrectas: "
              : "¿Aún no tienes una cuenta?"}
          </Alert.Heading>
          <Alert.Link href="http://localhost:3000/register">
            Click para registrarte
          </Alert.Link>
          .
        </Alert>
      </Form>
    </div>
  );
};
const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState, { loginAction })(Login);
