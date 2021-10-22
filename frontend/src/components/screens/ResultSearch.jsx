import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../../style/ResultSearch.css";
import { findByCategory } from "../../service/ProductService";
import { Button, Form, Modal } from "react-bootstrap";
import styled from "@emotion/styled";
import MyPagination from "../tools/MyPagination";

const ResultSearch = () => {
  const param = useParams();
  const [products, setproducts] = useState([]);
  const [allproducts, setallproducts] = useState([]);
  const [Filterstate, setFilterstate] = useState("");
  const [show, setShow] = useState(false);
  const [min, setmin] = useState(undefined);
  const [max, setmax] = useState(undefined);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleApply = (e) => {
    setproducts(orderBy(products));
    setShow(false);
  };
  const handleFilter = () => {
    setproducts(
      allproducts.filter((prod) => max >= prod.price && prod.price >= min)
    );
  };

  const handleQuitFilter = () => {
    document.getElementById("minimo").value = undefined;
    document.getElementById("maximo").value = undefined;
    setmax(undefined);
    setmin(undefined);
    setproducts(allproducts);
  };
  const handleChangeinput = (e, input, func) => {
    if (e.target.value > 0) {
      func(e.target.value);
    } else {
      document.getElementById(input).value = undefined;
      func(undefined);
    }
  };

  useEffect(() => {
    findByCategory(setproducts, param.product, param.category);
    findByCategory(setallproducts, param.product, param.category);
  }, [param]);

  const orderBy = () => {
    switch (Filterstate) {
      case "NombreAsc":
        return products.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0;
        });
      case "NombreDesc":
        return products.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          return 0;
        });
      case "PrecioAsc":
        return products.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      case "PrecioDesc":
        return products.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      default:
        return products;
    }
  };

  return (
    <div>
      <TitleResult id="h1Search">Resultados para "{param.product}"</TitleResult>

      <form>
        <div className="row">
          <div className="col-2">
            <WrapperButton>
              <Button variant="primary" onClick={handleShow}>
                Ordenar
              </Button>
            </WrapperButton>
          </div>
          <div className="col-3">
            <input
              type="number"
              className="form-control"
              placeholder="Precio minimo"
              id="minimo"
              onChange={(e) => {
                handleChangeinput(e, "minimo", setmin);
              }}
            />
          </div>
          <div className="col-3">
            <input
              type="number"
              className="form-control"
              placeholder="Precio Maximo"
              id="maximo"
              onChange={(e) => {
                handleChangeinput(e, "maximo", setmax);
              }}
            />
          </div>
          <div className="col-2">
            <Button
              variant="primary"
              onClick={handleFilter}
              disabled={!max || !min}
            >
              Filtrar
            </Button>
          </div>
          <div className="col-2">
            <Button variant="primary" onClick={handleQuitFilter}>
              Quitar Filtros
            </Button>
          </div>
        </div>
      </form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["NombreAsc", "NombreDesc", "PrecioAsc", "PrecioDesc"].map(
              (type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    onClick={(e) => setFilterstate(type)}
                    inline
                    label={type}
                    name="group1"
                    type={"radio"}
                    id={`inline-${type}-1`}
                  />
                </div>
              )
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={(e) => {
              handleApply(e);
            }}
          >
            Aplicar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container">
        <div className="row" id="result">
          <MyPagination products={products} />
        </div>
      </div>
    </div>
  );
};

export default ResultSearch;

const TitleResult = styled.h1`
  padding-left: 2em;
  padding-top: 2em;
  padding-bottom: 2em;
  color: white;
`;
const WrapperButton = styled.div`
  padding-left: 4em;
`;
