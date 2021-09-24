import React from "react";
import "../../style/Card.scss";
const CardOfProduct = (props) => {
  const product = props.product;
  return product ? (
    <div className="profile-card-4 text-center">
      <img
        src={product.imgSrc}
        className="img img-responsive"
        alt="card"
      />
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
              <button type="button" className="btn btn-primary">
                Comprar
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
