import React, { useState } from "react";
import FormAddProduct from "../tools/FormAddProduct";
import "../../style/FormAddProduct.css";
import "../../style/Nav.css";
import { post } from "../../api/Api";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addProductToStore } from "../Redux/ProductDuck";

const AddProduct = ({ addProductToStore, products }) => {
  const [nombre, setnombre] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [precio, setprecio] = useState(0);
  const [imgSrc, setImgSrc] = useState("");
  const history = useHistory();

  const handleClick = (e) => {
    if (nombre === "" || descripcion === "" || precio === 0 || imgSrc === "") {
      alert("Debes llenar todos los campos");
      return;
    }
    let storage = localStorage.getItem("user");
    storage = JSON.parse(storage);
    e.preventDefault();
    let product = {
      ownerUsername: storage.username,
      name: nombre,
      description: descripcion,
      price: precio,
      imgSrc: imgSrc,
    };
    post("products/add", product)
      .then((res) => {
        console.log(res);
        addProductToStore(res.data);
        setnombre("");
        setdescripcion("");
        setprecio(0);
        history.push("/");
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
        required={true}
      />
      <FormAddProduct
        label={"Descripcion"}
        placeholder={"Inserte un Descripcion"}
        type={"text"}
        value={descripcion}
        function={setdescripcion}
        required={true}
      />
      <FormAddProduct
        label={"$"}
        placeholder={"Inserte un precio"}
        type={"number"}
        value={precio}
        function={setprecio}
        required={true}
      />
      <FormAddProduct
        label={"URL de la imagen"}
        placeholder={"Inserte la url de la imagen"}
        type={"text"}
        value={imgSrc}
        function={setImgSrc}
        required={true}
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
const mapState = (state) => {
  return {
    products: state.products.products,
  };
};

export default connect(mapState, { addProductToStore })(AddProduct);
