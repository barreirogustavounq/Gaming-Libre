import { useEffect, useState } from "react";
import "../../style/FormAddProduct.css";
import "../../style/Nav.css";
import { useHistory } from "react-router-dom";
import "../../style/AddProduct.css";
import { Col, Container, Row } from "react-bootstrap";
import MyPagination from "../tools/MyPagination";
import styled from "@emotion/styled";
import { getPublications } from "../../api/Api";

export const Publications = () => {
  const history = useHistory();
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    getPublications(setPublications);
  }, [history]);

  console.log(publications);
  return (
    <Wrapper>
      <Title>Mis publicaciones</Title>
      <ProductsWrapper>
        <Container>
          <Row>
            <Col xs={8}>
              <MyPagination products={publications} />
            </Col>
          </Row>
        </Container>
      </ProductsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1em;
`;
const Title = styled.div`
  font-size: 35px;
  margin-left: 2em;
  color: white;
  border-bottom: 1px solid lightgray;
`;
const ProductsWrapper = styled.div`
  padding: 1em;
  margin-top: 1em;
`;
