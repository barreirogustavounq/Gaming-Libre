import React, {useEffect, useState} from "react";
import "../../style/Product.scss";
import {
    actualizeCartStock,
    actualizeStock,
    getOwnerData,
    getOwnerDataCart,
} from "../../service/ProductService";
import styled from "@emotion/styled";
import {useHistory} from "react-router-dom";
import {deleteAll} from "../Redux/CartDuck";
import {
    getAllProducts,
    updateProcts,
    updateProduct,
} from "../Redux/ProductDuck";
import {connect} from "react-redux";

const SuccessBuyMP = ({cart, deleteAll, updateProduct, getAllProducts}) => {

    const cartLS = localStorage.getItem("lastBuy") === 'cart' ? JSON.parse(localStorage.getItem("mpBuy")) : null;
    const product = localStorage.getItem("lastBuy") === 'single' ? JSON.parse(localStorage.getItem("mpBuy")) : null;
    const [ownerData, setOwnerData] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (product && product.stock === JSON.parse(localStorage.getItem("mpBuy")).stock) {
            getOwnerData(product, setOwnerData);
            actualizeStock(product);
            updateProduct(product);
        } else {
            getOwnerDataCart(cartLS, setOwnerData);
            actualizeCartStock();
            deleteAll(cart);
        }
        getAllProducts();
    }, []);

    return ownerData ? (
        <Wrapper>
            <Tilde/>
            <Title>Se acreditó tu pago</Title>
            <Subtitle>
                Estos son los datos de contacto de {product ? product.ownerUsername : 'tu carrito'}
            </Subtitle>
            <>
                {product ? (
                        <>
                            <Content>Ahora podes coordinar la entrega!</Content>
                            <Content>E-mail: {ownerData.email}</Content>
                            <Content>Teléfono: {ownerData.phone}</Content>
                            <Content>Teléfono: {ownerData.phone}</Content>
                            <Content>Ciudad: {ownerData.city}</Content>
                            <Content>Dirección: {ownerData.address}</Content>
                        </>
                    ) :
                    ownerData.map((owner) => (
                        <>
                            <Content>Ahora podes coordinar la entrega!</Content>
                            <Content>E-mail: {owner.email}</Content>
                            <Content>Teléfono: {owner.phone}</Content>
                            <Content>Teléfono: {owner.phone}</Content>
                            <Content>Ciudad: {owner.city}</Content>
                            <Content>Dirección: {owner.address}</Content>
                        </>
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
    };
};

export default connect(mapState, {deleteAll, updateProduct, getAllProducts})(
    SuccessBuyMP
);

const Wrapper = styled.div`
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
    margin-left: 9em;
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
    margin-left: 6.6em;
`;
