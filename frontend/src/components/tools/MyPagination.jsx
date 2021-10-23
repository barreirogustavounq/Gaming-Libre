import React, { useState } from "react";
import CardOfProduct from "./CardOfProduct";
import { Badge, Pagination, Spinner } from "react-bootstrap";
import "../../style/MyPagination.css";
import styled from "@emotion/styled";

const MyPagination = (props) => {
  const products = props.products;
  const [page, setPage] = useState(0);
  const cantOfElems = 5;

  const listOfProducts = () => {
    if (products.length > 0) {
      const res = [];
      for (
        let index = page * cantOfElems;
        index < (page + 1) * cantOfElems;
        index++
      ) {
        const element = products[index];
        if (products[index] !== undefined) {
          res.push(element);
        }
      }

      const result = res.map((product) => {
        return <CardOfProduct key={product.id} product={product} />;
      });

      const numerosDePaginacion = () => {
        const paginas = products.length / cantOfElems;
        let list = [];
        for (let index = 0; index < paginas; index++) {
          list.push(
            <Pagination.Item
              key={index}
              className={page === index ? "page-item active" : "page-item"}
              onClick={() => {
                setPage(index);
              }}
            >
              {index + 1}
            </Pagination.Item>
          );
        }
        return list;
      };

      const Paginacion = () => {
        return (
          <div className="MyPagination">
            <Pagination>{numerosDePaginacion()}</Pagination>;
          </div>
        );
      };

      return (
        <div>
          {Paginacion()}
          <div className="row">{result}</div>
        </div>
      );
    } else {
      return (
        <div id="noHayElementos" className="numero">
          <h1>
            <Badge bg="secondary">No hay Elementos</Badge>
          </h1>
        </div>
      );
    }
  };

  return (
    <div>
      {!products ? (
        <Spinner animation="border" variant="primary" />
      ) : products.length === 0 ? (
        <NotElement>No hay productos</NotElement>
      ) : (
        <div>{listOfProducts(products)}</div>
      )}
    </div>
  );
};

export default MyPagination;

const NotElement = styled.h1`
  padding-left: 2em;
  padding-top: 7em;
  padding-bottom: 2em;
  color: white;
`;
