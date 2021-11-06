import React, {useEffect, useState} from "react";

import { connect } from "react-redux";
import "../../style/Product.scss";
import { Button, Card } from "react-bootstrap";
import { FaShippingFast } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import AddCarButton from "../tools/AddCarButton";
import Swal from "sweetalert2";
import {buymp, buyProductMercadoPago, buyProductNow} from "../../service/ProductService";


const BuyProduct = ({ product }) => {
  const [buyNow, setBuyNow] = useState(false);
  const [ownerData, setOwnerData] = useState(null);
  const [buttonUrl, setButtonUrl] = useState('')


  const handleBuyNow = (payMethod) => {
    if (payMethod === "efectivo") {
      buyProductNow(product, setOwnerData, setBuyNow, buyNow);
    }
    if (payMethod === "mercadopago"){
      //buyProductMercadoPago(product, setOwnerData, setBuyNow, buyNow)
      buymp(product, setButtonUrl)
    }
  };
  const selectPaid = () => {
    Swal.fire({
      title: "Elige un medio de pago",
      input: "select",
      inputOptions: {
        efectivo: "efectivo",
        mercadopago: "mercadopago"
      },
      inputPlaceholder: "Medio de pago",
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          console.log(value);
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

  return buyNow ? (
    <Card
      style={{
        position: "flex",
        marginLeft: "20em",
        marginTop: "10em",
        width: "200em",
      }}
    >
      <Card.Body>
        <Card.Title>Ya casi es tuyo!</Card.Title>
        <Card.Text>
          Estos son los datos de contacto de {product.ownerUsername}
        </Card.Text>
        <Card.Text>Ahora podes coordinar la entrega!</Card.Text>
        <Card.Text>E-mail: {ownerData.mail}</Card.Text>
        <Card.Text>Teléfono: {ownerData.phone}</Card.Text>
        <Card.Text>Teléfono: {ownerData.phone}</Card.Text>
        <Card.Text>Ciudad: {ownerData.city}</Card.Text>
        <Card.Text>Dirección: {ownerData.address}</Card.Text>
      </Card.Body>
    </Card>
  ) : (
    <Card
      style={{
        position: "flex",
        marginLeft: "20em",
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
          {buttonUrl == '' ?
              <Button className={'pagarAhora'} onClick={() => selectPaid() }>
                <BiMoney /> Comprar ahora
              </Button>
          :
              <Button href={buttonUrl} className={'pagarAhora'}>
                <BiMoney /> Pagar con MercadoPago
              </Button>
          }
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

const mapState = (state) => {
  return {
    products: state.products.products,
  };
};

export default connect(mapState)(BuyProduct);
