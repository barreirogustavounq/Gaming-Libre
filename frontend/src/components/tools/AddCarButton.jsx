import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaCartPlus } from "react-icons/fa";
import { connect } from "react-redux";
import { addProduct } from "../Redux/CartDuck";

const AddCarButton = ({ product, addProduct }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Añadir al carrito
    </Tooltip>
  );
  const handleClick = (e) => {
    e.preventDefault();
    addProduct(product);
  };

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button
        onClick={(e) => {
          handleClick(e);
        }}
        overl
      >
        <FaCartPlus /> Agregar al carrito
      </Button>
    </OverlayTrigger>
  );
};
const mapState = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapState, { addProduct })(AddCarButton);
