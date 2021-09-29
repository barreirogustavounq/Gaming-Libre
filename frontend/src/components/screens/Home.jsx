import "../../style/Home.css";
import logo from "../../images/banner1.jpg";
import logo2 from "../../images/banner2.jpg";
import logo3 from "../../images/banner3.jpg";
import Carousel from "../tools/Carousel";
import CardOfProduct from "../tools/CardOfProduct";
import { connect } from "react-redux";

const Home = ({ products }) => {
  return (
    <>
      <Carousel imageList={[logo, logo2, logo3]} />
      <hr />
      <h1>Productos</h1>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <CardOfProduct product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
const mapState = (state) => {
  return {
    products: state.products.products,
  };
};

export default connect(mapState)(Home);
