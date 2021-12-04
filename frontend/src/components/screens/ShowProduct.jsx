import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const ShowProduct = () => {
  const [product, setproduct] = useState(undefined);
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    setproduct(JSON.parse(localStorage.getItem("showProduct")));
    console.log(product);
    console.log(localStorage.getItem("showProduct"));
  }, []);
  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size]);

  return product ? (
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
                ? {
                    width: "50%",
                    padding: "0 calc(5% - 1px)",
                    borderStyle: "groove",
                  }
                : { width: "100%" }
            }
            className="left"
          >
            <h2>{product.name}</h2>
            <img src={product.imgSrc} alt="" />
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
            <Description>{product.description}</Description>
            <h4 style={{ marginBottom: "1em" }}>
              Precio Total: ${product.price}{" "}
            </h4>
          </div>
        </div>
      </div>
      <div
        className="productCaracteristica"
        style={size > 620 ? { marginLeft: "15%" } : { marginLeft: "5%" }}
      >
        <CaracteristicasWrapper>
          <CaracteristicasTitle>Caracteristicas:</CaracteristicasTitle>
          <ListGroup variant="flush">
            {product.caracteristica.map((c) => (
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

const CaracteristicasTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const CaracteristicasWrapper = styled.div`
  padding: 5px 40px 5px 13px;
  width: fit-content;
`;
const Description = styled.p`
  text-align: justify;
  word-wrap: break-word;
  max-height: fit-content;
`;

export default ShowProduct;
