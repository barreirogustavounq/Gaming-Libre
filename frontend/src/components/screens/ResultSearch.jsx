import React, { useEffect, useState } from "react";
import CardOfProduct from "../tools/CardOfProduct";
import { useParams } from "react-router";
import "../../style/ResultSearch.css";
import { searchProduct } from "../../service/ProductService";

const ResultSearch = () => {
  const param = useParams();
  const [products, setproducts] = useState([]);

  useEffect(() => {
    searchProduct(setproducts, param);
  }, [param]);

  return (
    <div>
      <h1 id="h1Search">Resultados para "{param.product}"</h1>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div className="col">
              <CardOfProduct product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultSearch;
