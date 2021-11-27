import {useState} from "react";
import FormAddProduct from "../tools/FormAddProduct";
import "../../style/FormAddProduct.css";
import "../../style/Nav.css";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {addProductToStore} from "../Redux/ProductDuck";
import {addProduct} from "../../service/ProductService";
import categories from "../tools/CategoryList";
import CustomModal from "../tools/CustomModal";
import "../../style/AddProduct.css";

const AddProduct = ({addProductToStore, products}) => {
    const [nombre, setnombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setprecio] = useState();
    const [stock, setStock] = useState(1);
    const [imgSrc, setImgSrc] = useState("");
    const [category, setCategory] = useState("");
    const [modalShow, setmodalShow] = useState(false);
    const [tittle, setTittle] = useState("");
    const [message, setmessage] = useState("");
    const history = useHistory();
    const [contactCount, setContactCount] = useState(0);
    const [caracteristica, setcaracteristica] = useState([]);

    const getContactInputElements = () => {
        let contactInputElements = [];
        for (let i = 0; i <= contactCount; i++) {
            contactInputElements.push(
                <div
                    key={i}
                    id={"caracteristica_" + i}
                    className="input-group input-group-sm mb-3"
                >
                    <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              {"caracteristica_" + i}
            </span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="Ingrese una caracteristica"
                        onChange={(e) => handleInput(e, i)}
                    />
                    <button className="delete_contract" onClick={event => {handleDeleteCaract(i)}}>
                        - Eliminar Caracterisitca
                    </button>
                </div>
            );
        }
        return contactInputElements;
    };

    const handleInput = (e, i) => {
        let eventClass = e.target.className;
        switch (eventClass) {
            case "add_contact":
                setContactCount(contactCount + 1);
                break;
            case "form-control":
                let value = e.target.value;
                let newList = caracteristica;
                newList[i] = value;
                setcaracteristica(newList);
                break;
            default:
                break;
        }
    };

    const handleDeleteCaract = (i) => {
        setContactCount(contactCount - 1)
        console.log(caracteristica)
        console.log(caracteristica.splice(i, 1))
        console.log(caracteristica)
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (
            nombre === "" ||
            descripcion === "" ||
            precio === undefined ||
            imgSrc === "" ||
            category === ""
        ) {
            setTittle("No se puede agregar este producto");
            setmessage(
                "Todos los campos son obligatorios para poder agregar este producto"
            );
            setmodalShow(true);
            return;
        }
        addProduct(
            nombre,
            descripcion,
            caracteristica,
            precio,
            stock,
            imgSrc,
            history,
            addProductToStore,
            category,
            setTittle,
            setmessage,
            setmodalShow
        );
    };

    const handleHide = () => {
        if (message === "el producto fue guardado con exito") {
            history.push("/");
        }
        setmodalShow(false);
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
            <div>
                {getContactInputElements()}
                <button className="add_contact" onClick={handleInput}>
                    + Agregar Caracterisitca
                </button>
            </div>

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
            <CustomModal
                tittle={tittle}
                message={message}
                show={modalShow}
                onHide={() => handleHide()}
            />
        </div>
    );
};
const mapState = (state) => {
    return {
        products: state.products.products,
    };
};

export default connect(mapState, {addProductToStore})(AddProduct);
