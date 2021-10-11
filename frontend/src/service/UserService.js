export const logInService = (
  username,
  password,
  user,
  setError,
  loginAction
) => {
  loginAction(username, password);
  console.log(user.loggedIn, user.fetching);
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
      setAlertVisible(!alertVisible);
      history.push("/login");
    })
    .catch((error) => {
      alert(error);
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