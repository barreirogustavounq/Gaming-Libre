import Swal from "sweetalert2";

export const logInService = (
  username,
  password,
  user,
  setError,
  loginAction
) => {
  loginAction(username, password);
  if (!user.loggedIn || !user.fetching) {
    setError(true);
  }
};

export const registerService = (
  firstName,
  lastName,
  username,
  password,
  address,
  email,
  phone,
  register,
  history,
  setAlertVisible,
  alertVisible
) => {
  let user = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    username: username.trim(),
    password: password.trim(),
    address: address.trim(),
    email: email.trim(),
    phone: phone.trim(),
  };
  register(user)
    .then((result) => {
      console.log(result);
      if (result.error) {
        setAlertVisible(!alertVisible);
      }
      return result.data;
    })
    .then((data) => {
      if (data.error) {
        alert(
          "No se logro crear la cuenta, el usuario y/o mail ya se encuentran registrados"
        );
      } else {
        Swal.fire({
          icon: "success",
          title: "Cuenta creada exitosamente",
          showConfirmButton: true,
        }).then(() => {
          history.push("/login");
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "No se ha podido registrar",
        text: "El nombre de usuario y/o email ya están siendo utilizados",
      });
    });
};

export const updateUserService = (
  userstate,
  user,
  updateUser,
  updateUserStorage,
  setuserstate
) => {
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
