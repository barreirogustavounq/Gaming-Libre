import React from "react";
import "./Home.css";
import logo from "../../images/logo 2.png";
import logo2 from "../../images/logo192.png";
import logo3 from "../../images/logo512.png";
import Carousel from "../tools/Carousel";
import ListOfCards from "../tools/ListOfCards";

const Home = () => {
  return (
    <>
      <Carousel imageList={[logo, logo2, logo3]} />
      <hr />
      <h1>Favoritos</h1>
      <ListOfCards />
      <hr />
      <h1>Ultimos Vistos</h1>
      <ListOfCards />
    </>
  );
};

export default Home;
