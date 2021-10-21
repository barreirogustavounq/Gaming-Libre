import React from "react";
import styled from "@emotion/styled";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start">
      {/*  <div className="container d-flex justify-content-center py-5">
        <button
          type="button"
          className="btn btn-primary btn-lg btn-floating mx-2"
        >
          <i className="bi bi-facebook"></i>
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg btn-floating mx-2"
        >
          <i className="bi bi-envelope"></i>
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg btn-floating mx-2"
        >
          <i className="bi bi-instagram"></i>
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg btn-floating mx-2"
        >
          <i className="bi bi-twitter"></i>
        </button>
      </div>
      */}
      <WrapperFooter>
        © 2021 Copyright: Gaming-Libre.com
      </WrapperFooter>
    </footer>
  );
};

export default Footer;

const WrapperFooter = styled.div`
    background:black;
    color:white;
    margin-top: 10em;
    padding:2em;
    padding-left: 40em;
`
