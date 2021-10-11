import React, { useEffect, useState } from "react";
import CardOfProduct from "../tools/CardOfProduct";
import { useParams } from "react-router";
import "../../style/ResultSearch.css";
import { searchProduct } from "../../service/ProductService";
import { Button, Form, Modal } from "react-bootstrap";

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

  useEffect(() => {
    searchProduct(setproducts, param);
    searchProduct(setallproducts, param);
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
      <h1 id="h1Search">Resultados para "{param.product}"</h1>

      <form>
        <div className="row">
          <div className="col-3">
            <Button variant="primary" onClick={handleShow}>
              Ordenar
            </Button>
          </div>
          <div className="col-3">
            <input
              type="number"
              className="form-control"
              placeholder="Precio minimo"
              onChange={(e) => setmin(e.target.value)}
            />
          </div>
          <div className="col-3">
            <input
              type="number"
              className="form-control"
              placeholder="Precio Maximo"
              onChange={(e) => setmax(e.target.value)}
            />
          </div>
          <div className="col-3">
            <Button variant="primary" onClick={handleFilter}>
              Filtrar
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
        <div className="row">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <CardOfProduct product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultSearch;
