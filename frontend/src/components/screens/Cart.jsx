import React, { useEffect, useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { connect } from "react-redux";
import { deleteProduct, addProduct } from "../Redux/CartDuck";
import "../../style/cart.scss";
import { Badge, Button } from "react-bootstrap";
import {
  buyAllProductsMP,
  buyAllProductsNow, getShippingCost,
} from "../../service/ProductService";
import styled from "@emotion/styled";
import { BiMoney } from "react-icons/bi";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import { getAllProducts, updateProcts } from "../Redux/ProductDuck";

const Cart = ({
  cart,
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProcts,
  user,
}) => {
  const history = useHistory();
  const [cartstate, setcartstate] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  const [buttonUrl, setButtonUrl] = useState("");
  let total = 0;
  const [shippingPrice, setShippingPrice] = useState(0)
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    setcartstate(JSON.parse(localStorage.getItem("cart")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    cartstate.map((product) => (total += product.price));
  }, [cart]);

  const handleDelete = (product) => {
    deleteProduct(product);
  };

  let productsBuy = "";

  const handleAddOneToCart = (product) => {
    if (product.stock > product.buyQuantity) {
      product.buyQuantity = 1;
      addProduct(product);
    }
  };

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    getShippingCost(user.postalCode, cart.reduce((a,b) => a+ (b["buyQuantity"] || 0),0), setShippingPrice);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size, handleAddOneToCart]);

  const handleRemoveOneToCart = (product) => {
    if (product.buyQuantity > 1) {
      product.buyQuantity = -1;
      addProduct(product);
    }
  };

  const handleBuyNow = (payMethod) => {
    if (payMethod === "efectivo") {
      buyAllProductsNow(cartstate, productsBuy, history, user);
      updateProcts(getAllProducts());
    }
    if (payMethod === "mercadopago") {
      buyAllProductsMP(cartstate, productsBuy, setButtonUrl);
      let timerInterval;
      Swal.fire({
        title: "Procesando información...",
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {}, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
    }
  };

  const selectPaid = () => {
    Swal.fire({
      title: "Elige un medio de pago",
      input: "select",
      inputOptions: {
        efectivo: "Efectivo",
        mercadopago: "Mercado Pago",
      },
      inputPlaceholder: "Medio de pago",
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === undefined || value === "") {
            resolve("Selecciona un medio de pago");
          } else {
            handleBuyNow(value);
            resolve();
          }
        });
      },
    });
  };

  const NewCart = () => {
    return (
      <ContainerRow className="container">
        <div className="column-labels">
          <label className="productcart-image">Imagen</label>
          <label className="productcart-details">Producto</label>
          <label className="productcart-price">Precio</label>
          <label className="productcart-quantity">Cantidad</label>
          <label className="productcart-removal">Eliminar</label>
          <label className="productcart-line-price">Total</label>
        </div>
        {cartstate.map((product) => {
          total += product.price * product.buyQuantity;
          return (
            <div className="row">
              <div className="col-12">
                {" "}
                <div className="shopping-cart">
                  <div className="productcart">
                    <div className="productcart-image">
                      <img src={product.imgSrc} alt={product.id} />
                    </div>
                    <div className="productcart-details">
                      <div className="productcart-title">{product.name}</div>
                    </div>
                    <div className="productcart-price">{product.price}</div>
                    <div className="productcart-quantity">
                      <IoIosRemove
                        onClick={(e) => handleRemoveOneToCart(product)}
                      />

                      {"    "}
                      {product.buyQuantity}
                      {"    "}

                      <IoIosAdd onClick={(e) => handleAddOneToCart(product)} />
                    </div>
                    <div className="productcart-removal">
                      <button
                        className="remove-productcart"
                        onClick={(e) => handleDelete(product)}
                      >
                        Eliminar
                      </button>
                    </div>
                    <div className="productcart-line-price">
                      {product.price * product.buyQuantity}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="container">
          <RowTotal className="row">
            <div className="col">
              <Totals className="totals">
                <div className="totals-item">
                  <label>Subtotal</label>
                  <div className="totals-value" id="cart-subtotal">
                    {total}
                  </div>
                </div>
                <div className="totals-item">
                  <label>Envio</label>
                  <div className="totals-value" id="cart-shipping">
                    {shippingPrice}
                  </div>
                </div>
                <hr />
                <div className="totals-item totals-item-total">
                  <label>Total</label>
                  <div className="totals-value" id="cart-total">
                    {total + parseInt(shippingPrice)}
                  </div>
                </div>
              </Totals>
              {buttonUrl === "" ? (
                <Button
                  className="checkout"
                  onClick={() =>
                    localStorage.getItem("user")
                      ? selectPaid()
                      : history.push("/login")
                  }
                >
                  {" "}
                  Comprar
                </Button>
              ) : (
                <Button className="checkout" href={buttonUrl}>
                  <BiMoney /> Pagar
                </Button>
              )}
            </div>
          </RowTotal>
        </div>
      </ContainerRow>
    );
  };

  return cartstate.length === 0 ? (
    <h1 id="noHayElementos">
      {" "}
      <Badge bg="secondary">No hay elementos en el carrito </Badge>{" "}
    </h1>
  ) : (
    <NewCart />
  );
};
const mapState = (state) => {
  return {
    cart: state.cart.cart,
    user: state.user.user,
  };
};
export default connect(mapState, {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProcts,
})(Cart);

const ContainerRow = styled.div`
  margin-top: 11rem;
  background-color: white;
`;
const Totals = styled.div`
  padding-right: 106px;
`;

const RowTotal = styled.div`
  bottom: 3rem;
  right: 5rem;
  z-index: 1;
  background-color: #ffffffa8;
  border-radius: 10%;
  min-width: 19rem;
`;
