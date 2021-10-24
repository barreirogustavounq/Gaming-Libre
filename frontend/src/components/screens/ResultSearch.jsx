import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../../style/ResultSearch.css";
import { findByCategory } from "../../service/ProductService";
import styled from "@emotion/styled";
import MyPagination from "../tools/MyPagination";
import FilterForm from "../tools/FilterForm";
import BackButton from "../tools/BackButton";

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
    <div>
      <TitleResult id="h1Search">Resultados para "{param.product}"</TitleResult>

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
