import React, { useState } from "react";

import { connect } from "react-redux";
import "../../style/Product.scss";
import { Button, Card } from "react-bootstrap";
import { FaShippingFast } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import AddCarButton from "../tools/AddCarButton";
import Swal from "sweetalert2";
import { buymp, buyProductNow } from "../../service/ProductService";
import { updateProduct } from "../Redux/ProductDuck";
import { useHistory } from "react-router";

const BuyProduct = ({ updateProduct, product, user }) => {
  const history = useHistory();
  const [buyNow, setBuyNow] = useState(false);
  const [ownerData, setOwnerData] = useState(null);
  const [buttonUrl, setButtonUrl] = useState("");

  const handleBuyNow = (payMethod) => {
    if (payMethod === "efectivo") {
      buyProductNow(product, setOwnerData, user);
      updateProduct(product);
      history.push(`/success`);
    }
    if (payMethod === "mercadopago") {
      buymp(product, setButtonUrl);
      let timerInterval;
      Swal.fire({
        title: "Procesando información...",
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {}, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
    }
  };
  const selectPaid = () => {
    Swal.fire({
      title: "Elige un medio de pago",
      input: "select",
      inputOptions: {
        efectivo: "Efectivo",
        mercadopago: "Mercado Pago",
      },
      inputPlaceholder: "Medio de pago",
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === undefined || value === "") {
            resolve("Selecciona un medio de pago");
          } else {
            console.log(value);
            handleBuyNow(value);
            resolve();
          }
        });
      },
    });
  };
  return (
    <Card
      style={{
        position: "flex",
        marginLeft: "16%",
        marginTop: "10em",
        width: "200em",
      }}
    >
      <Card.Body>
        <Card.Title>Compra tu producto: {product.name}</Card.Title>
        <div style={{ marginTop: "2em" }} />
        <Card.Subtitle className="mb-2 text-muted">Descripción:</Card.Subtitle>
        <Card.Text>{product.description}</Card.Text>
        <div style={{ marginTop: "2em" }} />
        <Card.Text>
          <FaShippingFast /> Metodo de entrega: Retira en domicilio del
          vendedor.
        </Card.Text>
        <div style={{ marginTop: "2em" }} />
        <Card.Text>Cantidad disponible: {product.stock}</Card.Text>
        <div style={{ marginTop: "2em" }} />
        <Card.Footer>
          <div style={{ marginTop: "2em" }} />
          <AddCarButton product={product} />

          <div style={{ marginTop: "2em" }} />
          {buttonUrl === "" ? (
            <Button
              disabled={product.stock <= 0}
              className={"pagarAhora"}
              onClick={() =>
                localStorage.getItem("user")
                  ? selectPaid()
                  : history.push("/login")
              }
            >
              <BiMoney /> Comprar ahora
            </Button>
          ) : (
            <Button href={buttonUrl} className={"pagarAhora"}>
              <BiMoney /> Pagar con MercadoPago
            </Button>
          )}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

const mapState = (state) => {
  return {
    products: state.products.products,
    user: state.user.user,
  };
};

export default connect(mapState, { updateProduct })(BuyProduct);
