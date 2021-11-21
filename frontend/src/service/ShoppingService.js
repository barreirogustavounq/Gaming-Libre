import { getShopping } from "../api/Api";

export const getShoppingofUser = (user, setshopping) => {
  getShopping(user)
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      setshopping(data);
    })
    .catch((err) => console.log(err));
};