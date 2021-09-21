import React, {useState, useEffect} from "react";
import "./Home.css";
import axios from "axios";
import logo from "../../images/banner1.jpg";
import logo2 from "../../images/banner2.jpg";
import logo3 from "../../images/banner3.jpg";
import Carousel from "../tools/Carousel";
import CardOfProduct from "../tools/CardOfProduct";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products/getAll")
      .then((res) => res)
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Carousel imageList={[logo, logo2, logo3]} />
      <hr />
      <h1>Productos</h1>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div className="col">
              <CardOfProduct product={product} />
            </div>
          ))}
        </div>
      </div>
      <h1></h1>
      <CardOfProduct />
      <hr />
      <h1>Ultimos Vistos</h1>
      <CardOfProduct />
    </>
  );
};

export default Home;
