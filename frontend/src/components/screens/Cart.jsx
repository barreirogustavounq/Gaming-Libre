import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { connect } from "react-redux";
import { deleteProduct, deleteAll, addProduct } from "../Redux/CartDuck";
import "../../style/cart.css";
import { Badge, Button } from "react-bootstrap";
import { buyAllProductsNow } from "../../service/ProductService";
import styled from "@emotion/styled";

const Cart = ({ cart, addProduct, deleteProduct, deleteAll }) => {
  const [cartstate, setcartstate] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  let total = 0;
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    console.log(size);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size]);

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
    <ContainerCart className="container">
      {cartstate.map((product) => {
        total += product.price * product.buyQuantity;
        return (
          <RowCart key={product.id}>
            <div className={size > 990 ? "col-3" : "col-5"}>
              {" "}
              <ImageCart src={product.imgSrc} alt={product.id} />)
            </div>

            {size > 990 ? (
              <div className="col-3">
                <H1Cart> {product.name} </H1Cart>{" "}
              </div>
            ) : (
              <></>
            )}

            <div className={size > 990 ? "col-2" : "col-3"}>
              <H1Cart> $ {product.price} </H1Cart>{" "}
            </div>
            <div className="col-3">
              <H1Cart>
                <Button onClick={(e) => handleRemoveOneToCart(product)}>
                  <IoIosRemove />
                </Button>
                {"    "}
                {product.buyQuantity}
                {"    "}
                <Button onClick={(e) => handleAddOneToCart(product)}>
                  <IoIosAdd />
                </Button>
              </H1Cart>
            </div>
            <div className="col-1">
              <H1Cart>
                {" "}
                <Button id="deleteIcon" onClick={(e) => handleDelete(product)}>
                  <FaTrash />
                </Button>{" "}
              </H1Cart>
            </div>
          </RowCart>
        );
      })}
      <div className="container">
        <RowCart>
          <Button onClick={handleBuy}>
            {" "}
            Comprar todos los productos por $ {total}
          </Button>
        </RowCart>
      </div>
    </ContainerCart>
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

const ImageCart = styled.img`
  min-height: 12em;
  max-height: 10em;
  border-radius: 23%;
  margin-bottom: 3rem;
`;

const H1Cart = styled.h5`
  padding-top: 5rem;
  color: aliceblue;
`;
const ContainerCart = styled.div`
  margin-top: 14rem;
`;
const RowCart = styled.div`
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x) * -0.5);
  margin-left: calc(var(--bs-gutter-x) * -0.5);
`;
