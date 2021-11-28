import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import BuyProduct from "./BuyProduct";
import { ListGroup } from "react-bootstrap";
import styled from "@emotion/styled";
import AddCarButton from "../tools/AddCarButton";
import { FaShippingFast } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Product = ({ products }) => {
  const id = useParams().id;
  let selectedProduct = products.find((prod) => prod.id === id);
  const [buyQuantity, setbuyQuantity] = useState(0);
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size]);

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
    <>
      <div
        style={size > 620 ? { marginLeft: "15%" } : { marginLeft: "5%" }}
        className="product"
      >
        <div className="header">
          <Link to="/">
            <div className="back" />
          </Link>
        </div>
        <div className="main">
          <div
            style={
              size > 880
                ? { width: "50%", padding: "0 calc(5% - 1px)" }
                : { width: "100%" }
            }
            className="left"
          >
            <h2>{selectedProduct.name}</h2>
            <img src={selectedProduct.imgSrc} alt="" />
          </div>
          <div
            style={
              size > 880
                ? { width: "50%", padding: "0 calc(5% - 1px)" }
                : { width: "100%" }
            }
            className="right"
          >
            <h4 id="price">Descripcion:</h4>
            <Description>{selectedProduct.description}</Description>
            <div style={{ marginTop: "1em" }}>
              <FaShippingFast /> Metodo de entrega: Retira en domicilio del
              vendedor.
            </div>
            <p>En stock: {selectedProduct.stock}</p>
            <Description className="quantity">
              <div style={{ marginTop: "1em", marginBottom: "1em" }}>
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
                <h4 style={{ marginBottom: "1em" }}>
                  Precio: ${selectedProduct.price * selectedProduct.buyQuantity}{" "}
                </h4>
              </span>
            </Description>
          </div>
          <ButtonsWrapper className={size > 880 ? "right" : "left"}>
            <div className="row">
              <CartButtonStyle style={{ padding: "6px" }} className="col-5">
                <AddCarButton product={selectedProduct} />
              </CartButtonStyle>
              <BuyButtonStyle
                style={{ padding: "6px", marginLeft: "2rem" }}
                className="col-5"
              >
                <BuyProduct product={selectedProduct} />
              </BuyButtonStyle>
            </div>
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
    </>
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
  width: fit-content;
`;
const ButtonsWrapper = styled.div`
  display: flex;
`;
const Description = styled.p`
  text-align: justify;
  word-wrap: break-word;
  max-height: fit-content;
`;
const CartButtonStyle = styled.div``;
const BuyButtonStyle = styled.div``;

export default connect(mapState)(Product);
