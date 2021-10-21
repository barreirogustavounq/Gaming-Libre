import React from "react";
import { useHistory } from "react-router";
import "../../style/Card.scss";
import styled from "@emotion/styled";
const CardOfProduct = (props) => {
  const product = props.product;
  const history = useHistory();
  const handleClick = (e) => {
    console.log(e)
    e.preventDefault();
    console.log(product)
    history.push(`/product/${product.id}`);
  };
  return product ? (
      <ProductButton onClick={handleClick}>
        {console.log('product', product)}
    <div className="profile-card-4 text-center">
      <Image src={product.imgSrc} className="img img-responsive" alt="card" />
      <div className="profile-content">
        <ProductName >{product.name}</ProductName>
        <ProductDescription >{product.description}</ProductDescription>
        <div className="row">
          <div className="col-xs-4">
            <Price className="profile-overview">
              $ {product.price}
            </Price>
          </div>
          <div className="col-xs-4">
          </div>
        </div>
      </div>
    </div>
      </ProductButton>
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

const ProductButton = styled.button`
    border: 3px solid black;
    background-color: white;
    border-radius: 8px;
`
const Price = styled.p`
    font-size: 2em;
    font-weight: bold;
`

const ProductDescription = styled.div`

`
