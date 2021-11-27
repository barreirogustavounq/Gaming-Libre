import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import BuyProduct from "./BuyProduct";
import { Card, ListGroup } from "react-bootstrap";
import styled from "@emotion/styled";
import AddCarButton from "../tools/AddCarButton";
import { FaShippingFast } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "./Loading";

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
          <img src={selectedProduct.imgSrc} alt="" />
        </div>
        <div className="right">
          <h4 id="price">Descripcion:</h4>
          <Description>{selectedProduct.description}</Description>
          <div style={{marginTop:'1em'}}>
          <FaShippingFast /> Metodo de entrega: Retira en domicilio del
          vendedor.
          </div>
          <p>En stock: {selectedProduct.stock}</p>
          <Description className="quantity">
            <div style={{marginTop:'1em', marginBottom:'1em'}}>
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
            </div>
            <span>
              {" "}
              <h4 style={{marginBottom:'1em'}}>Precio: ${selectedProduct.price * selectedProduct.buyQuantity} </h4>
            </span>
          </Description>
        </div>
        <ButtonsWrapper className="container">
          <CartButtonStyle className="col-3">
            <AddCarButton product={selectedProduct} />
          </CartButtonStyle>
          <BuyButtonStyle className="col-3">
            <BuyProduct product={selectedProduct} />
          </BuyButtonStyle>
        </ButtonsWrapper>
      </div>
        <CaracteristicasWrapper>
        <CaracteristicasTitle>Caracteristicas:</CaracteristicasTitle>

        <ListGroup variant="flush">
          {selectedProduct.caracteristica.map((c) => (
            <ListGroup.Item>{c}</ListGroup.Item>
          ))}
        </ListGroup>
        </CaracteristicasWrapper>
    </div>
  ) : (
    <Loading />
  );
};
const mapState = (state) => {
  return {
    products: state.products.products,
  };
};

const CaracteristicasTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
`;
const CaracteristicasWrapper = styled.div`
    padding: 5px 40px 5px 13px;
    width: calc(90% - 40px);
`;
const ButtonsWrapper = styled.div`
    display: flex;
    margin-left: 29em;
`;
const Description = styled.p`
  text-align: justify;
  word-wrap: break-word;
  max-height: fit-content;
`;
const CartButtonStyle = styled.div`

`;
const BuyButtonStyle = styled.div`

`;

export default connect(mapState)(Product);
