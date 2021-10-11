import React from "react";
import { useHistory } from "react-router";
import "../../style/Card.scss";
import styled from "@emotion/styled";
const CardOfProduct = (props) => {
  const product = props.product;
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/product/${product.id}`);
  };
  return product ? (
    <div className="profile-card-4 text-center">
      <Image src={product.imgSrc} className="img img-responsive" alt="card" />
      <div className="profile-content">
        <ProductName >{product.name}</ProductName>
        <ProductDescription >{product.description}</ProductDescription>
        <div className="row">
          <div className="col-xs-4">
            <div className="profile-overview">
              <p>Precio</p>
              <h4>$ {product.price}</h4>
            </div>
          </div>
          <div className="col-xs-4">
            <div className="profile-overview">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Ver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default CardOfProduct;


const Image = styled.img`
max-height: 10rem;
`
const ProductName = styled.div`
     font-size: 3em;
`

const ProductDescription = styled.div`

`
