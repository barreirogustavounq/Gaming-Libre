import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../style/Nav.css";
import logo from "../images/logo-sin-fondo.png";
import { connect } from "react-redux";
import NavButton from "./tools/NavButton";

const Nav = () => {
  const [textSearch, settextSearch] = useState("");
  const history = useHistory();

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (textSearch) {
      history.push(`/products/resultsearch/${textSearch}`);
      settextSearch("");
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

            <NavButton />
          </div>
        </div>
      </nav>
    </>
  );
};
const mapState = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapState)(Nav);
