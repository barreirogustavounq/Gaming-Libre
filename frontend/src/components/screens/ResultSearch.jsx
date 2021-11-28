import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../../style/ResultSearch.css";
import { findByCategory } from "../../service/ProductService";
import styled from "@emotion/styled";
import MyPagination from "../tools/MyPagination";
import FilterForm from "../tools/FilterForm";

const ResultSearch = () => {
  const param = useParams();
  const [products, setproducts] = useState([]);
  const [allproducts, setallproducts] = useState([]);
  const [Filterstate, setFilterstate] = useState("");
  const [show, setShow] = useState(false);
  const [min, setmin] = useState(undefined);
  const [max, setmax] = useState(undefined);

  useEffect(() => {
    findByCategory(setproducts, param.product, param.category);
    findByCategory(setallproducts, param.product, param.category);
  }, [param]);

  return (
    <DivResult>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <FilterForm
              products={products}
              setproducts={setproducts}
              allproducts={allproducts}
              Filterstate={Filterstate}
              show={show}
              min={min}
              max={max}
              setallproducts={setallproducts}
              setFilterstate={setFilterstate}
              setShow={setShow}
              setmin={setmin}
              setmax={setmax}
            />
          </div>
          <div className="col-12">
            <TitleResult id="h1Search">
              Resultados para "{param.product}"
            </TitleResult>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row" id="result">
          <MyPagination products={products} />
        </div>
      </div>
    </DivResult>
  );
};

export default ResultSearch;

const TitleResult = styled.h1`
  padding-top: 2em;
  color: white;
`;
const DivResult = styled.div`
  margin-top: 9em;
`;
