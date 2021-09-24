import React, {useState} from "react";
import FormAddProduct from "../tools/FormAddProduct";
import "../../style/FormAddProduct.css";
import "../../style/Nav.css";
import axios from "axios";
import {useHistory} from "react-router-dom";

const AddProduct = () => {
    const [nombre, setnombre] = useState('');
    const [descripcion, setdescripcion] = useState('');
    const [precio, setprecio] = useState(0);
    const [imgSrc, setImgSrc] = useState('');
    const history = useHistory();

    const handleClick = (e) => {
        if(nombre === '' || descripcion === '' || precio === 0 || imgSrc === '' ) {
            alert('Debes llenar todos los campos')
            return;
        }
        e.preventDefault();
        axios
            .post(
                "http://localhost:8080/products/add",
                {
                    ownerUsername: localStorage.getItem('user'),
                    name: nombre,
                    description: descripcion,
                    price: precio,
                    imgSrc,
                },
                {
                    headers: {"Access-Control-Allow-Origin": "*"},
                }
            )
            .then((res) => {
                setnombre("");
                setdescripcion("");
                setprecio(0);
                history.push('/')
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

export default AddProduct;
