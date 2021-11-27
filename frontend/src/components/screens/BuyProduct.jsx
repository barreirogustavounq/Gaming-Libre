import React, { useState } from "react";

import { connect } from "react-redux";
import "../../style/Product.scss";
import { Button, Card } from "react-bootstrap";
import { FaShippingFast } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import AddCarButton from "../tools/AddCarButton";
import Swal from "sweetalert2";
import { buymp, buyProductNow } from "../../service/ProductService";
import { updateProcts } from "../Redux/ProductDuck";
import { useHistory } from "react-router";

const BuyProduct = ({ updateProcts, product, user }) => {
  const history = useHistory();
  const [ownerData, setOwnerData] = useState(null);
  const [buttonUrl, setButtonUrl] = useState("");

  const handleBuyNow = (payMethod) => {
    if (payMethod === "efectivo") {
      localStorage.setItem('medioDePago', 'efectivo')
      buyProductNow(product, setOwnerData,history, user);
      updateProcts([product]);
      history.push(`/success`);
      buyProductNow(product, setOwnerData,history, history);
    }
    if (payMethod === "mercadopago") {
      localStorage.setItem('medioDePago', 'mercadopago')
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
            handleBuyNow(value);
            resolve();
          }
        });
      },
    });
  };
  return buttonUrl === "" ? (
    <Button
      disabled={product.stock <= 0}
      className={"pagarAhora"}
      onClick={() =>
        localStorage.getItem("user") ? selectPaid() : history.push("/login")
      }
    >
      <BiMoney /> Comprar ahora
    </Button>
  ) : (
    <Button href={buttonUrl} className={"pagarAhora"}>
      <BiMoney /> Pagar con MercadoPago
    </Button>
  );
};

const mapState = (state) => {
  return {
    products: state.products.products,
    user: state.user.user,
  };
};

export default connect(mapState, { updateProcts })(BuyProduct);
