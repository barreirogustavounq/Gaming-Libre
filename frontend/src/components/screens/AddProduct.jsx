import React, {useState} from "react";
import FormAddProduct from "../tools/FormAddProduct";
import "../../style/FormAddProduct.css";
import "../../style/Nav.css";
import {post} from "../../api/Api";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {addProductToStore} from "../Redux/ProductDuck";

const AddProduct = ({addProductToStore, products}) => {
    const [nombre, setnombre] = useState("");
    const [descripcion, setdescripcion] = useState("");
    const [precio, setprecio] = useState();
    const [stock, setStock] = useState(1);
    const [imgSrc, setImgSrc] = useState("");
    const history = useHistory();

    const handleClick = (e) => {
        if (nombre === "" || descripcion === "" || precio === undefined || imgSrc === "") {
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
            stock,
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
                function={setdescripcion}
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

export default connect(mapState, {addProductToStore})(AddProduct);
