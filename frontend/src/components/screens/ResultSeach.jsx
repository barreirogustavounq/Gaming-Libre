import axios from "axios";
import React, { useEffect, useState } from "react";
import CardOfProduct from "../tools/CardOfProduct";
import { useParams } from "react-router";
import "../../style/ResultSearch.css";

const ResultSeach = () => {
  const param = useParams();
  const [products, setproducts] = useState([]);
  const URL = `http://localhost:8080/products/resultsearch/${param.product}`;
  console.log(param);
  useEffect(() => {
    axios
      .get(URL)
      .then((res) => res.data)
      .then((data) => setproducts(data))
      .catch((err) => console.log(err));
  }, [URL, param]);
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

export default ResultSeach;
