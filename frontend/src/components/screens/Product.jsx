import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import BuyProduct from "./BuyProduct";
import { Card } from "react-bootstrap";

const Product = ({ products }) => {
  const id = useParams().id;
  const selectedProduct = products.find((prod) => prod.id === id);
  return (
    <div className="row">
      <div className="column">
        <Card
          style={{
            position: "flex",
            marginLeft: "20em",
            marginTop: "10em",
            width: "200em",
          }}
        >
          <Card.Body>
            <div style={{ marginTop: "2em" }} />
            <Card.Subtitle className="mb-2 text-muted">
              <img src={selectedProduct.imgSrc} alt={selectedProduct.name} />
            </Card.Subtitle>
            <Card.Text>{selectedProduct.name}</Card.Text>
            <div style={{ marginTop: "2em" }} />
            <Card.Footer>{selectedProduct.description}</Card.Footer>
          </Card.Body>
        </Card>
      </div>
      <div className="column">
        <BuyProduct product={selectedProduct} />
      </div>
    </div>
  );
};
const mapState = (state) => {
  return {
    products: state.products.products,
  };
};

export default connect(mapState)(Product);
