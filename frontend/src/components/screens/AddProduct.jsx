import React, { useState } from "react";
import FormAddProduct from "../tools/FormAddProduct";
import "../../style/FormAddProduct.css";
import "../../style/Nav.css";
import axios from "axios";

const AddProduct = () => {
  const [nombre, setnombre] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [precio, setprecio] = useState(0);

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/products/add",
        {
          name: nombre,
          description: descripcion,
          price: precio,
        },
        {
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      )
      .then((res) => {
        setnombre("");
        setdescripcion("");
        setprecio(0);
        alert("el producto fue guardado con exito");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="FormAddProduct">
      <FormAddProduct
        label={"Nombre"}
        placeholder={"Inserte un nombre"}
        type={"text"}
        value={nombre}
        function={setnombre}
      />
      <FormAddProduct
        label={"Descripcion"}
        placeholder={"Inserte un Descripcion"}
        type={"text"}
        value={descripcion}
        function={setdescripcion}
      />
      <FormAddProduct
        label={"$"}
        placeholder={"Inserte un precio"}
        type={"number"}
        value={precio}
        function={setprecio}
      />

      <button
        className="btn-secondary"
        type="button"
        onClick={(e) => handleClick(e)}
      >
        Guardar
      </button>
    </div>
  );
};

export default AddProduct;
