import { addShopping, getShopping, getShippingPrice } from "../api/Api";

export const getShoppingofUser = (user, setshopping) => {
  getShopping(user)
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      setshopping(data);
    })
    .catch((err) => console.log(err));
};

export const getShippingPriceOf = (postalCode) => {
    getShippingPrice(postalCode).then(r => console.log(r))
}

export const addShooppingService = (user, products) => {
  addShopping(user, products)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
