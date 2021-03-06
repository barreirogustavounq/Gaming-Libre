import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../style/Register.css";
import { register } from "../../api/Api";
import { Alert, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { registerService } from "../../service/UserService";
import styled from "@emotion/styled";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    registerService(
      firstName,
      lastName,
      username,
      password,
      address,
      email,
      phone,
      register,
      history,
      setAlertVisible,
      alertVisible
    );
  }

  function validateForm() {
    return username.length > 0 && password.length > 0 && email.length > 0;
  }

  return (
    <div className="Register">
      <RegisterWrapper>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                required
                placeholder="Usuario"
                autoFocus
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                placeholder="Ingrese su contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                placeholder="example@mail.com"
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                placeholder="Nombre"
                autoFocus
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                placeholder="Apellido"
                autoFocus
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                placeholder="Telefono"
                autoFocus
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                placeholder="Dirección"
                autoFocus
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Col>
          </Row>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Registrar
          </Button>
          <Alert
            className="alertButton"
            variant={alertVisible ? "success" : "secondary"}
          >
            <Alert.Heading>
              {alertVisible ? "Registro exitoso!" : "Si ya estas registrado"}
            </Alert.Heading>
            <Alert.Link onClick={() => history.push("/login")}>
              Click acá para iniciar sesión
            </Alert.Link>
            .
          </Alert>
        </Form>
      </RegisterWrapper>
    </div>
  );
};

export default Register;

const RegisterWrapper = styled.div`
  background-color: white;
  width: 35em;
  height: 48em;
  padding-top: 2em;
  border: 1px solid white;
  border-radius: 8px;
`;
