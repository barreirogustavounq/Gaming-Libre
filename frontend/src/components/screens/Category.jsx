import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { findByMyCategory } from "../../service/ProductService";
import FilterForm from "../tools/FilterForm";
import MyPagination from "../tools/MyPagination";

const Category = () => {
  const cat = useParams().category;
  const [products, setproducts] = useState([]);
  const [allproducts, setallproducts] = useState([]);
  const [Filterstate, setFilterstate] = useState("");
  const [show, setShow] = useState(false);
  const [min, setmin] = useState(undefined);
  const [max, setmax] = useState(undefined);

  useEffect(() => {
    findByMyCategory(setproducts, cat);
    findByMyCategory(setallproducts, cat);
  }, [cat]);

  return (
    <div>
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

export default Category;
