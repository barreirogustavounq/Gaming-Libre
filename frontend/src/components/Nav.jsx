import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../style/Nav.css";
import logo from "../images/logo 2.png";



const Nav = (props) => {
  //const user = props.user;
  const user = props.user
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
    localStorage.removeItem('user')
    window.location.reload()
  }
  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/user/count/${user.id}`);
  };
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
        <img id="logo" src={logo} alt="logo" />
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
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
              ></i>
            </form>

            <i id="cartIcon" className="bi bi-cart"></i>

            <div className="btn-group">
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle"></i>{" "}
                {user ? user.firstName : "ingresar"}
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={(e) => handleClick(e)}
                >
                  Cuenta
                </button>
                <button className="dropdown-item" type="button" onClick={logOut}>
                  Cerrar Sesion
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
