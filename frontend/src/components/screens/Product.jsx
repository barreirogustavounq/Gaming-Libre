import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";

const Product = ({ products }) => {
  const id = useParams().id;
  const selectedProduct = products.find((prod) => prod.id === id);
  return (
    <div>
      <h1>{selectedProduct.name}</h1>
      <img src={selectedProduct.imgSrc} alt={selectedProduct.name} />
      <h2>{selectedProduct.description}</h2>
    </div>
  );
};
const mapState = (state) => {
  return {
    products: state.products.products,
  };
};

export default connect(mapState)(Product);
