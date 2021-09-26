import React from "react";
import { useHistory } from "react-router";
import "../../style/Card.scss";
const CardOfProduct = (props) => {
  const product = props.product;
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/product/${product.id}`);
  };
  return product ? (
    <div className="profile-card-4 text-center">
      <img src={product.imgSrc} className="img img-responsive" alt="card" />
      <div className="profile-content">
        <div className="profile-name">{product.name}</div>
        <div className="profile-description">{product.description}</div>
        <div className="row">
          <div className="col-xs-4">
            <div className="profile-overview">
              <p>Precio</p>
              <h4>$ {product.price}</h4>
            </div>
          </div>
          <div className="col-xs-4">
            <div className="profile-overview">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Ver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default CardOfProduct;
