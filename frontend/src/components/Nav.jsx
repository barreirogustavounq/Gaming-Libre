import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../style/Nav.css";
import logo from "../images/logo-sin-fondo.png";

const Nav = (props) => {
  const user = props.user;
  const [textSearch, settextSearch] = useState("");
  const history = useHistory();

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (textSearch) {
      history.push(`/products/resultsearch/${textSearch.toLowerCase()}`);
      settextSearch("");
    }
  };

  const logOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  const handleClick = (e) => {
    //console.log(user);
    history.push(`/user/count/${user.id}`);
  };

  const goToAddProduct = () => {
    history.push("/products/add-product");
  };

  const RenderNavButton = () => {
    if (user) {
      return (
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="bi bi-person-circle" /> {user.firstName}
          </button>
          <div className="dropdown-menu dropdown-menu-right">
            <button
              className="dropdown-item"
              type="button"
              onClick={(e) => handleClick(e)}
            >
              Cuenta
            </button>
            <button
              className="dropdown-item"
              type="button"
              onClick={goToAddProduct}
            >
              Agregar producto
            </button>
            <button className="dropdown-item" type="button" onClick={logOut}>
              Cerrar Sesion
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <button
          id="loginButton"
          type="button"
          className="btn btn-secondary"
          onClick={() => history.push("/login")}
        >
          {" "}
          Ingresar
        </button>
      );
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
        <img
          id="logo"
          src={logo}
          alt="logo"
          onClick={() => history.push("/")}
        />
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                id="SearchIcon"
                className="bi bi-search"
              />
            </form>

            <RenderNavButton />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
