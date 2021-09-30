import React from "react";
import { Button } from "react-bootstrap";
import { FaCartPlus } from "react-icons/fa";
import { connect } from "react-redux";
import { addProduct } from "../Redux/CartDuck";

const AddCarButton = ({ product, addProduct }) => {
  const handleClick = (e) => {
    e.preventDefault();
    addProduct(product);
  };

  return (
    <Button
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <FaCartPlus /> Agregar al carrito
    </Button>
  );
};
const mapState = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapState, { addProduct })(AddCarButton);
