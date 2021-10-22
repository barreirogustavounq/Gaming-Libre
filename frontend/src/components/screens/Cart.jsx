import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { connect } from "react-redux";
import { deleteProduct, deleteAll } from "../Redux/CartDuck";
import CardOfProduct from "../tools/CardOfProduct";
import "../../style/cart.css";
import { Badge, Button } from "react-bootstrap";
import { buyAllProductsNow } from "../../service/ProductService";
const Cart = ({ cart, deleteProduct, deleteAll }) => {
  const [cartstate, setcartstate] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  useEffect(() => {
    setcartstate(JSON.parse(localStorage.getItem("cart")));
  }, [cart]);

  const handleDelete = (product) => {
    deleteProduct(product);
  };

  let productsBuy = "";

  const handleBuy = (e) => {
    buyAllProductsNow(cartstate, productsBuy, deleteAll);
  };

  return cartstate.length === 0 ? (
    <h1 id="noHayElementos">
      {" "}
      <Badge bg="secondary">No hay elementos en el carrito </Badge>{" "}
    </h1>
  ) : (
    <div>
      <div className="container">
        <div className="row">
          {cartstate.map((product) => (
            <div className="col" key={product.id}>
              <div className="container">
                <Button id="deleteIcon" onClick={(e) => handleDelete(product)}>
                  <FaTrash />
                </Button>
                <span>Cantidad: {product.buyQuantity}</span>
                <CardOfProduct product={product} />
              </div>
            </div>
          ))}
          <Button onClick={handleBuy}> Comprar todos los productos </Button>
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
export default connect(mapState, { deleteProduct, deleteAll })(Cart);
