import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "../../style/Card.scss";
import styled from "@emotion/styled";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
const CardOfProduct = (props) => {
  const type = props.type;
  const product = props.product;
  const history = useHistory();
  const [size, setSize] = useState(window.innerWidth);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {product.name}
    </Tooltip>
  );

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size]);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(type);
    if (!type) {
      history.push(`/product/${product.id}`);
    } else {
      localStorage.setItem("showProduct", JSON.stringify(product));
      history.push(`/show/product`);
    }
  };
  return product ? (
    <ProductButton onClick={handleClick}>
      {size >= 994 ? (
        <div className="profile-card-4 text-center">
          <Image
            src={product.imgSrc}
            className="img img-responsive"
            alt="card"
          />
          <div className="profile-content">
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <ProductName>{product.name}</ProductName>
            </OverlayTrigger>
            <ProductDescription>{product.description}</ProductDescription>
            <div className="row">
              <div className="col-xs-4">
                <Price className="profile-overview">$ {product.price}</Price>
              </div>
              <div className="col-xs-4"></div>
            </div>
          </div>
        </div>
      ) : (
        <Image src={product.imgSrc} className="img img-responsive" alt="card" />
      )}
    </ProductButton>
  ) : (
    <p>Loading...</p>
  );
};

export default CardOfProduct;

const Image = styled.img`
  max-height: 10rem;
`;
const ProductName = styled.div`
  font-size: 2em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 23rem;
`;

const ProductButton = styled.button`
  border: 3px solid black;
  background-color: white;
  border-radius: 8px;
  min-height: 11rem;
  margin-bottom: 11px;
  margein-left: 10% !important;
`;
const Price = styled.p`
  font-size: 2em;
  font-weight: bold;
`;

const ProductDescription = styled.div`
  overflow: hidden;
  width: 26rem;
  text-align: justify;
  max-height: 3rem;
  text-overflow: ellipsis;
  min-height: 3rem;
`;
