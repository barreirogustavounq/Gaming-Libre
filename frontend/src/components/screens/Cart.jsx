import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { connect } from "react-redux";
import { deleteProduct, deleteAll } from "../Redux/CartDuck";
import CardOfProduct from "../tools/CardOfProduct";
import "../../style/cart.css";
import { Button } from "react-bootstrap";
import { buyProductQuantity} from "../../api/Api";
const Cart = ({ cart, deleteProduct , deleteAll}) => {

  const [cartstate, setcartstate] = useState(
      JSON.parse(localStorage.getItem("cart"))
  );
  useEffect(() => {
    setcartstate(JSON.parse(localStorage.getItem("cart")));
  }, [cart]);

  const handleDelete = (product) => {
    deleteProduct(product);
  };

  let productsBuy = ''

  const handleBuy = (e) => {
    cartstate.map((product) => {
      buyProductQuantity(product).then((response) => {
        productsBuy = productsBuy + `${product.name} ${response.data} `
        alert(productsBuy)
      }).catch((err) => {
        console.log(err)
      })
    })
    deleteAll()
  }

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
                <span>Cantidad: {(product.buyQuantity)}</span>
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
