import "../../style/Home.css";
import logo from "../../images/banner1.jpg";
import logo2 from "../../images/banner2.jpg";
import logo3 from "../../images/banner3.jpg";
import Carousel from "../tools/Carousel";
import CardOfProduct from "../tools/CardOfProduct";
import { connect } from "react-redux";
import styled from "@emotion/styled";

const Home = ({ products }) => {
  return (
    <>
      <Carousel imageList={[logo, logo2, logo3]} />
      <hr />
      <Title>Productos</Title>
      <div className="container">
        <Products>
          {products.map((product) => (
            <div className="col" key={product.id}>
              <CardOfProduct product={product} />
            </div>
          ))}
        </Products>
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

const Products = styled.div`
    background: #FAFAFA;
    margin-top: 2em;
    display: table;
`
const Title = styled.h1`
    padding-left:1em;
`
