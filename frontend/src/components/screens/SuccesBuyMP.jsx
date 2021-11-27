import React, { useEffect, useState } from "react";
import "../../style/Product.scss";
import {
  actualizeCartStock,
  actualizeStock,
  getOwnerData,
  getOwnerDataCart,
} from "../../service/ProductService";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import { getAllProducts, updateProcts } from "../Redux/ProductDuck";
import { connect } from "react-redux";
import { addShooppingService } from "../../service/ShoppingService";
import { apiKey, DOMAIN } from "../../Mailgun/MailgunCredentials";
import { deleteAll } from "../Redux/CartDuck";

const SuccessBuyMP = ({
  user,
  cart,
  deleteAll,
  updateProcts,
  getAllProducts,
}) => {
  const cartLS =
    localStorage.getItem("lastBuy") === "cart"
      ? JSON.parse(localStorage.getItem("mpBuy"))
      : null;
  const product =
    localStorage.getItem("lastBuy") === "single"
      ? JSON.parse(localStorage.getItem("mpBuy"))
      : null;
  const [ownerData, setOwnerData] = useState(null);
  const history = useHistory();
  const medioDePago = localStorage.getItem('medioDePago')

  useEffect(() => {
    if (
      product &&
      product.stock === JSON.parse(localStorage.getItem("mpBuy")).stock
    ) {
      getOwnerData(product, setOwnerData, sendMailSingle, user);
      actualizeStock(product);
      updateProcts([product]);
      addShooppingService(user, [product]);
    } else {
      getOwnerDataCart(cartLS, setOwnerData, sendMailSingle, user);
      actualizeCartStock();
      addShooppingService(user, cart);
      deleteAll(cart);
    }
    getAllProducts();
  }, []);
  const sendMailSingle = (prod, owner, userShop) => {
    const mailgun = require("mailgun-js");
    const mg = mailgun({ apiKey: apiKey, domain: DOMAIN });

    const dataComprador = {
      from: "Gaming Libre <postmaster@" + DOMAIN + ">",
      to: userShop.email,
      subject: "Tu compra ya esta casi lista",
      text: `Este es el codigo con el que deberas acercarte a una sucursal de Rapipago: KJLHljkLKJHLkjgblkGJ8765jhvgkY5 \n
              Producto : ${prod.name} \n
              E-mail: ${owner.email} \n
              Teléfono: ${owner.phone} \n
              Ciudad: ${owner.city} \n
              Dirección: ${owner.address} }`,
    };
    const dataVendedor = {
      from: "Gaming Libre <postmaster@" + DOMAIN + ">",
      to: owner.email,
      subject: `${userShop.username} ha comprado ${prod.name}`,
      text: `Solo debes aguardar que realice el pago \n
             A continuacion los datos de ${userShop.username}
              E-mail: ${userShop.email} \n
              Teléfono: ${userShop.phone ? userShop.phone : "no aporta"} \n
              Ciudad: ${userShop.city ? userShop.city : "no aporta"} \n
              Dirección: ${userShop.address ? userShop.address : "no aporta"} `,
    };

    mg.messages().send(dataComprador, function (error, body) {
      console.log(body);
    });
    mg.messages().send(dataVendedor, function (error, body) {
      console.log(body);
    });
  };

    return ownerData ? (
        <Wrapper>
            <Tilde/>
            <Title>{medioDePago === 'efectivo' ? 'Estás a un paso de tu compra!' :'Se acreditó tu pago'}</Title>
            <Subtitle>
                Estos son los datos de contacto de {product ? product.ownerUsername : 'tu carrito'}
            </Subtitle>
            <Content>Ahora podes coordinar la entrega!</Content>
            <>
                {product ? (
                        <ProductWrapper>
                            <Content>Producto : {product.name}</Content>
                            <Content>E-mail: {ownerData.email}</Content>
                            <Content>Teléfono: {ownerData.phone}</Content>
                            <Content>Teléfono: {ownerData.phone}</Content>
                            <Content>Ciudad: {ownerData.city}</Content>
                            <Content>Dirección: {ownerData.address}</Content>
                        </ProductWrapper>
                    ) :
                    ownerData.map((owner) => (
                        <ProductWrapper>
                            <Content>Producto : {owner.product}</Content>
                            <Content>E-mail: {owner.data.email}</Content>
                            <Content>Teléfono: {owner.data.phone}</Content>
                            <Content>Teléfono: {owner.data.phone}</Content>
                            <Content>Ciudad: {owner.data.city}</Content>
                            <Content>Dirección: {owner.data.address}</Content>
                        </ProductWrapper>
                    ))
                }
            </>
            <Button onClick={() => history.push('/')}>Volver al inicio</Button>
        </Wrapper>) : null
};

const mapState = (state) => {
  return {
    cart: state.cart.cart,
    products: state.products.products,
    user: state.user.user,
  };
};

export default connect(mapState, { deleteAll, updateProcts, getAllProducts })(
  SuccessBuyMP
);

const Wrapper = styled.div`
    text-align: -webkit-center;
    background: white;
    min-width: fit-content;
    min-height: fit-content;
    border-radius: 50px;
    max-width: fit-content;
    max-height: fit-content;
    margin-left: 35%;
    margin-top: 10em;
    padding-bottom: 2em;
    padding-top: 2em;
`;

const ProductWrapper = styled.div`
    text-align: left;
    margin-top: 1em;
    margin-bottom: 0.1em;
    border-bottom: 1px solid lightgray;
`;
const Subtitle = styled.div`
  margin-bottom: 1em;
  margin-right: 2em;
  margin-left: 2em;
`;
const Title = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 1em;
`;

const Tilde = styled.div`
    margin-top: 1em;
    width: 4em;
    height: 4em;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 50 50' style='enable-background:new 0 0 50 50;' xml:space='preserve'%3E%3Ccircle style='fill:%2325AE88;' cx='25' cy='25' r='25'/%3E%3Cpolyline style='fill:none;stroke:%23FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;' points=' 38,15 22,33 12,25 '/%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A");
`;
const Content = styled.div`
  margin-right: 2em;
  margin-left: 2em;
`;

const Button = styled.button`
    border: none;
    background: lightblue;
    border-radius: 7px;
    padding: 8px;
    margin-top: 1em;
`;
