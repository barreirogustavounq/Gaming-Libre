import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = (props) => {
  const user = props.user;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Gaming Libre
          </Link>
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
            <form id="searchForm" className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <i id="SearchIcon" class="bi bi-search"></i>
            </form>

            <Link className="nav-link active">
              <i id="cartIcon" className="bi bi-cart"></i>
            </Link>
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
                <button className="dropdown-item" type="button">
                  Cuenta
                </button>
                <button className="dropdown-item" type="button">
                  Mis compras
                </button>
                <button className="dropdown-item" type="button">
                  Favoritos
                </button>
                <button className="dropdown-item" type="button">
                  Configuracion
                </button>
                <button className="dropdown-item" type="button">
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
