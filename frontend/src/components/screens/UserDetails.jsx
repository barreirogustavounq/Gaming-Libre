import { useState } from "react";
import { useParams } from "react-router";
import "../../style/UserDetails.scss";
import { updateUser } from "../../api/Api";
import { connect } from "react-redux";
import { updateUserStorage } from "../Redux/UserDuck";

const UserDetails = ({ updateUserStorage, userStorage }) => {
  const user = useParams().id;
  const [userstate, setuserstate] = useState(userStorage);

  const handleUpdate = () => {
    let userUpd = userstate;
    userUpd.id = user;
    updateUser(userUpd)
      .then((res) => res)
      .then((data) => {
        updateUserStorage(data.data);
        setuserstate(data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e, attr) => {
    let userChange = userstate;
    userChange[attr] = e.target.value;
    setuserstate(userChange);
  };

  return userstate ? (
    <>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                alt="imageProfile"
              />
              <span className="font-weight-bold">{userstate.username}</span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Datos del Usuario</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    defaultValue={userstate.firstName}
                    onChange={(e) => handleChange(e, "firstName")}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={userstate.lastName}
                    placeholder="surname"
                    onChange={(e) => handleChange(e, "lastName")}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Numero de Telefono</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    defaultValue={userstate.phone}
                    onChange={(e) => handleChange(e, "phone")}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Direccion</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 1"
                    defaultValue={userstate.address}
                    onChange={(e) => handleChange(e, "address")}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Código Postal</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    defaultValue={userstate.postalCode}
                    onChange={(e) => handleChange(e, "postalCode")}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Localidad</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    defaultValue={userstate.city}
                    onChange={(e) => handleChange(e, "city")}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Provincia</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    defaultValue={userstate.state}
                    onChange={(e) => handleChange(e, "state")}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter email id"
                    defaultValue={userstate.email}
                    onChange={(e) => handleChange(e, "email")}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Fecha de Nacimiento</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Fecha de Nacimiento"
                    defaultValue={userstate.birthday}
                    onChange={(e) => handleChange(e, "birthday")}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 text-center">
              <button
                className="btn btn-primary profile-button"
                type="button"
                onClick={handleUpdate}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};
const mapState = (state) => {
  return {
    userStorage: state.user.user,
  };
};

export default connect(mapState, { updateUserStorage })(UserDetails);
