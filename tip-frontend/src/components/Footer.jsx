import React from "react";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start">
      <div className="container d-flex justify-content-center py-5">
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
          <i class="bi bi-instagram"></i>
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg btn-floating mx-2"
        >
          <i className="bi bi-twitter"></i>
        </button>
      </div>
      <div className="text-center text-black p-3">
        © 2021 Copyright: Gaming-Libre.com
      </div>
    </footer>
  );
};

export default Footer;
