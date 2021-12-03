import {useEffect, useState} from "react";
import "../../style/FormAddProduct.css";
import "../../style/Nav.css";
import {useHistory} from "react-router-dom";
import "../../style/AddProduct.css";
import {Col, Container, Row} from "react-bootstrap";
import MyPagination from "../tools/MyPagination";
import styled from "@emotion/styled";
import {getBuys} from "../../api/Api";

export const Buys = () => {
    const history = useHistory();
    const [buys, setBuys] = useState([])

    useEffect(() => {
        getBuys(setBuys)
    },[history])

    return (
        <Wrapper>
            <Title>Mis compras</Title>
            <ProductsWrapper>
                <Container>
                    <Row>
                        <Col xs={8}>
                            <MyPagination products={buys} />
                        </Col>
                    </Row>
                </Container>
            </ProductsWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding:1em;
`
const Title = styled.div`
    font-size: 35px;
    margin-left: 2em;
    color: white;
    border-bottom: 1px solid lightgray;
   
`
const ProductsWrapper = styled.div`
    padding: 1em;
    margin-top: 1em;
`

