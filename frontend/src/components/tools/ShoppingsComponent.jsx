import { useEffect, useState } from "react";
import { Card, CardGroup } from "react-bootstrap";

const ShoppingsComponent = ({ products }) => {
  const [productsState, setproductsState] = useState([]);

  useEffect(() => {
    setproductsState(products);
  }, [products]);
  console.log(productsState);
  const renderElement = () => {
    if (productsState.length > 0) {
      return (
        <CardGroup>
          {productsState.map((prod) => {
            return (
              <Card key={prod.id}>
                <Card.Img variant="top" src={prod.imgSrc} />
                <Card.Body>
                  <Card.Title>{prod.name}</Card.Title>
                  <Card.Text>{prod.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Precio: {prod.price} Cantidad: {prod.buyQuantity}
                  </small>
                </Card.Footer>
              </Card>
            );
          })}
        </CardGroup>
      );
    } else {
      return <p>No hay elementos</p>;
    }
  };
  return renderElement();
};

export default ShoppingsComponent;
