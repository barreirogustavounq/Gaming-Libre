import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import BuyProduct from "./BuyProduct";
import { Card } from "react-bootstrap";
import styled from "@emotion/styled";
import AddCarButton from "../tools/AddCarButton";
import { FaShippingFast } from "react-icons/fa";
import { Link } from "react-router-dom";

const Product = ({ products }) => {
  const id = useParams().id;
  let selectedProduct = products.find((prod) => prod.id === id);
  const [buyQuantity, setbuyQuantity] = useState(0);

  useEffect(() => {
    if (selectedProduct) {
      setbuyQuantity(1);
    }
  }, [selectedProduct]);

  const handleSum = () => {
    selectedProduct.buyQuantity = buyQuantity + 1;
    setbuyQuantity(buyQuantity + 1);
  };

  const handleAbs = () => {
    if (buyQuantity > 1) {
      selectedProduct.buyQuantity = buyQuantity - 1;
      setbuyQuantity(buyQuantity - 1);
    }
  };
  return selectedProduct ? (
    <div className="product">
      <div className="header">
        <Link to="/">
          <div className="back" />
        </Link>
      </div>
      <div className="main">
        <div className="left">
          <h2>{selectedProduct.name}</h2>
          <h3>${selectedProduct.price}.00</h3>
          <img src={selectedProduct.imgSrc} alt="" />
        </div>
        <div className="right">
          <p id="price">Descripcion:</p>
          <Description>{selectedProduct.description}</Description>
          <FaShippingFast /> Metodo de entrega: Retira en domicilio del
          vendedor.
          <p>En stock: {selectedProduct.stock}</p>
          <p className="quantity">
            Cantidad{" "}
            <span
              className="fa fa-angle-left angle"
              onClick={(e) => handleAbs()}
            />
            <span id="qt">{buyQuantity}</span>
            <span
              className="fa fa-angle-right angle"
              onClick={(e) => handleSum()}
            />
          </p>
        </div>
        <div className="container">
          <CartButtonStyle className="col-12">
            <AddCarButton product={selectedProduct} />
          </CartButtonStyle>
          <BuyButtonStyle className="col-12">
            <BuyProduct product={selectedProduct} />
          </BuyButtonStyle>
        </div>
      </div>
      <div className="footer">
        <div className="left">
          <p id="price">
            ${selectedProduct.price * selectedProduct.buyQuantity}
          </p>
        </div>
        <div className="right"></div>
      </div>
    </div>
  ) : (
    <h1>Cargando...</h1>
  );
};
const mapState = (state) => {
  return {
    products: state.products.products,
  };
};

const Image = styled.img`
  max-height: 13rem;
  max-width: -webkit-fill-available;
`;
const Description = styled.p`
  min-height: 15rem;
  max-height: 15rem;
  text-align: justify;
  word-wrap: break-word;
`;
const CartButtonStyle = styled.div`
  position: absolute;
  left: 34rem;
  top: 30rem;
`;
const BuyButtonStyle = styled.div`
  position: absolute;
  left: 34rem;
  top: 25rem;
`;

export default connect(mapState)(Product);
