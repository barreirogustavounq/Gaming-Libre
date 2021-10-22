import "../../style/Home.css";
import logo from "../../images/banner1.jpg";
import logo2 from "../../images/banner2.jpg";
import logo3 from "../../images/banner3.jpg";
import Carousel from "../tools/Carousel";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import Categories from "./Categories";
import MyPagination from "../tools/MyPagination";

const Home = ({ products, setProducts }) => {
  return (
    <>
      <Carousel imageList={[logo, logo2, logo3]} />

      <Title>Productos</Title>
      <div className="container">
        <Wrapper>
          <Categories />
          <MyPagination products={products} />
        </Wrapper>
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

const Wrapper = styled.div`
  margin-top: 2em;
  display: inline-flex;
`;

const Title = styled.h1`
  padding-left: 1em;
  padding-top: 1em;
  color: white;
`;
