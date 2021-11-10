import "../../style/Home.css";
import logo from "../../images/banner1.jpg";
import logo2 from "../../images/banner2.jpg";
import logo3 from "../../images/banner3.jpg";
import Carousel from "../tools/Carousel";
import { connect } from "react-redux";
import Categories from "./Categories";
import MyPagination from "../tools/MyPagination";
import { Col, Container, Row } from "react-bootstrap";

const Home = ({ products, setProducts }) => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Carousel imageList={[logo, logo2, logo3]} />
          </Col>
        </Row>
      </Container>
      <br />
      <Container>
        <Row>
          <Col xs={4}>
            <Categories />
          </Col>
          <Col xs={8}>
            <MyPagination products={products} />
          </Col>
        </Row>
      </Container>
    </>
  );
};
const mapState = (state) => {
  return {
    products: state.products.products,
  };
};

export default connect(mapState)(Home);
