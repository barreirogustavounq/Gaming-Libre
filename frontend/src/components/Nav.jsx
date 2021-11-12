import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../style/Nav.css";
import logo from "../images/logo-sin-fondo.png";
import { connect } from "react-redux";
import NavButton from "./tools/NavButton";
import { FaCartPlus } from "react-icons/fa";
import { Col, Container, Row } from "react-bootstrap";
import styled from "@emotion/styled";

const NavExpand = ({
  history,
  SubmitHandler,
  textSearch,
  settextSearch,
  cart,
}) => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <Container fluid>
        <Row id="NavRow">
          <Col>
            <img
              id="logo"
              src={logo}
              alt="logo"
              onClick={() => history.push("/")}
            />
          </Col>
          <Col xs={6}>
            <form
              id="searchForm"
              className="d-flex"
              onSubmit={(e) => SubmitHandler(e)}
            >
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
                value={textSearch}
                onChange={(e) => settextSearch(e.target.value)}
              />
            </form>
          </Col>
          <Col>
            <i
              id="SearchIcon"
              onClick={(e) => SubmitHandler(e)}
              className="bi bi-search"
            />
          </Col>
          <Col>
            <CartNumber> {cart.length} </CartNumber>
            <Link id="cartIcon" to="/user/cart">
              <FaCartPlus />{" "}
            </Link>
          </Col>
          <Col>
            <NavButton />
          </Col>
        </Row>
      </Container>
    </nav>
  );
};
const OffcanvasNav = ({
  history,
  SubmitHandler,
  textSearch,
  settextSearch,
  cart,
}) => {
  return (
    <Container>
      <Row fluid>
        <Col id="LogoCol">
          {" "}
          <img
            id="logo"
            src={logo}
            alt="logo"
            onClick={() => history.push("/")}
          />
        </Col>

        <Col xs={2}>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
            aria-label="Toggle navigation"
          >
            <i id="toogleIcon" class="bi bi-card-text"></i>
          </button>
          <div
            className="offcanvas offcanvas-start"
            tabIndex={-1}
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="offcanvas-header">
              <img
                id="logo"
                src={logo}
                alt="logo"
                onClick={() => history.push("/")}
              />
              <div>
                <CartNumberOffCanvas> {cart.length} </CartNumberOffCanvas>
                <Link id="cartOffCanvas" to="/user/cart">
                  <FaCartPlus />
                </Link>
              </div>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <div className="buttonOffCanvas">
                <form
                  id="searchForm"
                  className="d-flex"
                  onSubmit={(e) => SubmitHandler(e)}
                >
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={textSearch}
                    onChange={(e) => settextSearch(e.target.value)}
                  />
                  <i
                    onClick={(e) => SubmitHandler(e)}
                    className="bi bi-search"
                  />
                </form>
              </div>
              <div className="buttonOffCanvasProfile">
                <NavButton />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const Nav = ({ cart }) => {
  const [textSearch, settextSearch] = useState("");
  const history = useHistory();
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (textSearch) {
      history.push(`/products/resultsearch/all/${textSearch}`);
      settextSearch("");
    }
  };

  return size > 880 ? (
    <NavExpand
      history={history}
      SubmitHandler={SubmitHandler}
      textSearch={textSearch}
      settextSearch={settextSearch}
      cart={cart}
    />
  ) : (
    <OffcanvasNav
      history={history}
      SubmitHandler={SubmitHandler}
      textSearch={textSearch}
      settextSearch={settextSearch}
      cart={cart}
    />
  );
};
const mapState = (state) => {
  return {
    user: state.user.user,
    cart: state.cart.cart,
  };
};

export default connect(mapState)(Nav);

const CartNumber = styled.p`
  color: #f9fafb;
  position: fixed;
  font-size: 22px;
  margin-left: 19px !important;
  margin-top: -22px !important;
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;
const CartNumberOffCanvas = styled.p`
  color: #f9fafb;
  position: fixed;
  font-size: 22px;
  margin-left: 57px !important;
  margin-top: -32px !important;
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;
