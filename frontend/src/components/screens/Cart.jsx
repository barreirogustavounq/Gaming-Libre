import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { connect } from "react-redux";
import { deleteProduct } from "../Redux/CartDuck";
import CardOfProduct from "../tools/CardOfProduct";
import "../../style/cart.css";
import { Button } from "react-bootstrap";
const Cart = ({ cart, deleteProduct }) => {
  const [cartstate, setcartstate] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  useEffect(() => {
    setcartstate(JSON.parse(localStorage.getItem("cart")));
  }, [cart]);
  const handleDelete = (product) => {
    deleteProduct(product);
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          {cartstate.map((product) => (
            <div className="col" key={product.id}>
              <div className="container">
                <Button id="deleteIcon" onClick={(e) => handleDelete(product)}>
                  <FaTrash />
                </Button>
                <CardOfProduct product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const mapState = (state) => {
  return {
    cart: state.cart.cart,
  };
};
export default connect(mapState, { deleteProduct })(Cart);
