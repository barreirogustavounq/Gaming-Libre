import { useState } from "react";
import FormAddProduct from "../tools/FormAddProduct";
import "../../style/FormAddProduct.css";
import "../../style/Nav.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addProductToStore } from "../Redux/ProductDuck";
import { addProduct } from "../../service/ProductService";
import categories from "../tools/CategoryList";

const AddProduct = ({ addProductToStore, products }) => {
  const [nombre, setnombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setprecio] = useState();
  const [stock, setStock] = useState(1);
  const [imgSrc, setImgSrc] = useState("");
  const [category, setCategory] = useState("");
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    if (
      nombre === "" ||
      descripcion === "" ||
      precio === undefined ||
      imgSrc === "" ||
      category === ""
    ) {
      alert("Debes llenar todos los campos");
      return;
    }
    addProduct(
      nombre,
      descripcion,
      precio,
      stock,
      imgSrc,
      history,
      addProductToStore,
      category
    );
  };
  return (
    <div className="FormAddProduct">
      <FormAddProduct
        label={"Nombre"}
        placeholder={"Ingrese el nombre del producto"}
        type={"text"}
        value={nombre}
        function={setnombre}
        required={true}
      />
      <FormAddProduct
        label={"Descripción"}
        placeholder={"Ingrese una descripción del producto"}
        type={"text"}
        value={descripcion}
        function={setDescripcion}
        required={true}
      />
      <FormAddProduct
        label={"$"}
        placeholder={"Ingrese el precio del producto"}
        type={"number"}
        value={precio}
        function={setprecio}
        required={true}
      />
      <FormAddProduct
        label={"Stock"}
        placeholder={"Ingrese la cantidad que desea publicar"}
        type={"number"}
        value={stock}
        function={setStock}
        required={true}
      />
      <FormAddProduct
        label={"URL de la imagen"}
        placeholder={"Ingrese la url de la imagen"}
        type={"text"}
        value={imgSrc}
        function={setImgSrc}
        required={true}
      />
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option hidden value="">
          Seleccione una Categoria
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button
        className="btn btn-primary"
        id="addProductButton"
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
