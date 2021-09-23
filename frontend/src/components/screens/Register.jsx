import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../style/Register.css";
import { register } from "../../api/Api";
import { Alert, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";

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
    let user = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      username: username.trim(),
      password: password.trim(),
      address: address.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };
    register(user)
      .then((result) => {
        setAlertVisible(!alertVisible);
        history.push("/login");
      })
      .catch((error) => {
        alert(error);
      });
  }

  function validateForm() {
    return username.length > 0 && password.length > 0 && email.length > 0;
  }

  return (
    <div className="Register">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              placeholder="Username"
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password"
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
            <Form.Label>First name</Form.Label>
            <Form.Control
              placeholder="First name"
              autoFocus
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              placeholder="Last name"
              autoFocus
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              placeholder="Phone"
              autoFocus
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="Address"
              autoFocus
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Col>
        </Row>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Register
        </Button>
        <Alert
          className="alertButton"
          variant={alertVisible ? "success" : "secondary"}
        >
          <Alert.Heading>
            {alertVisible ? "Register successful!" : "If you already register"}
          </Alert.Heading>
          <Alert.Link href="http://localhost:3000/">
            click here to login
          </Alert.Link>
          .
        </Alert>
      </Form>
    </div>
  );
};

export default Register;
