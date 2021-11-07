import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutAction } from "../Redux/UserDuck";
import "../../style/Nav.css";
const NavButton = ({ logoutAction, user }) => {
  const history = useHistory();

  const logOut = () => {
    localStorage.removeItem("user");
    logoutAction();
  };
  const handleClick = () => {
    history.push(`/user/count/${user.id}`);
  };

  const goToAddProduct = () => {
    history.push("/products/add-product");
  };

  if (user) {
    return (
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-secondary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="bi bi-person-circle" /> {user.firstName}
        </button>
        <div className="dropdown-menu dropdown-menu-right">
          <button className="dropdown-item" type="button" onClick={handleClick}>
            Cuenta
          </button>
          <button
            className="dropdown-item"
            type="button"
            onClick={goToAddProduct}
          >
            Agregar producto
          </button>
          <button className="dropdown-item" type="button" onClick={logOut}>
            Cerrar Sesion
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => history.push("/login")}
      >
        {" "}
        Ingresar
      </button>
    );
  }
};

const mapState = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapState, { logoutAction })(NavButton);
