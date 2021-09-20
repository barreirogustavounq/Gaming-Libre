import React from "react";

const Carousel = (props) => {
  const imageList = props.imageList;
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src={imageList[0]} alt="First slide" />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={imageList[1]}
            alt="Second slide"
          />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={imageList[2]} alt="Third slide" />
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only"></span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only"></span>
      </a>
    </div>
  );
};

export default Carousel;
