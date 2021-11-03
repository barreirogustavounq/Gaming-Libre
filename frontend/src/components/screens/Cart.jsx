import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { connect } from "react-redux";
import { deleteProduct, deleteAll, addProduct } from "../Redux/CartDuck";
import "../../style/cart.css";
import { Badge, Button } from "react-bootstrap";
import { buyAllProductsNow } from "../../service/ProductService";

const Cart = ({ cart, addProduct, deleteProduct, deleteAll }) => {
  const [cartstate, setcartstate] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  let total = 0;

  useEffect(() => {
    setcartstate(JSON.parse(localStorage.getItem("cart")));
    cartstate.map((product) => (total += product.price));
  }, [cart]);

  const handleDelete = (product) => {
    deleteProduct(product);
  };

  let productsBuy = "";

  const handleBuy = (e) => {
    buyAllProductsNow(cartstate, productsBuy, deleteAll);
  };

  const handleAddOneToCart = (product) => {
    if (product.stock > product.buyQuantity) {
      product.buyQuantity = 1;
      addProduct(product);
    }
  };

  const handleRemoveOneToCart = (product) => {
    if (product.buyQuantity > 1) {
      product.buyQuantity = -1;
      addProduct(product);
    }
  };

  return cartstate.length === 0 ? (
    <h1 id="noHayElementos">
      {" "}
      <Badge bg="secondary">No hay elementos en el carrito </Badge>{" "}
    </h1>
  ) : (
    <div>
      {cartstate.map((product) => {
        total += product.price * product.buyQuantity;
        return (
          <div key={product.id} className="container">
            <div className="row">
              <div className="col">
                {" "}
                <img src={product.imgSrc} alt={product.id} />
              </div>
              <div className="col">
                <h1> {product.name} </h1>{" "}
              </div>
              <div className="col">
                <h1> $ {product.price} </h1>{" "}
              </div>
              <div className="col">
                <Button onClick={(e) => handleRemoveOneToCart(product)}>
                  <IoIosRemove />
                </Button>
                {"    "}
                {product.buyQuantity}
                {"    "}
                <Button onClick={(e) => handleAddOneToCart(product)}>
                  <IoIosAdd />
                </Button>
              </div>
              <div className="col">
                {" "}
                <Button id="deleteIcon" onClick={(e) => handleDelete(product)}>
                  <FaTrash />
                </Button>{" "}
              </div>
            </div>
          </div>
        );
      })}
      <div className="container">
        <div className="row">
          <Button onClick={handleBuy}>
            {" "}
            Comprar todos los productos por $ {total}
          </Button>
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
export default connect(mapState, { addProduct, deleteProduct, deleteAll })(
  Cart
);
