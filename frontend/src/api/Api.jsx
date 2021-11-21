import axios from "axios";

const url = "http://localhost:8080/";
const mpUrl = "http://localhost:3001/";
const header = { headers: { "Access-Control-Allow-Origin": "*" } };

export const get = (endpoint) => {
  return axios.get(url + endpoint);
};

export const post = (endpoint, body) => {
  return axios.post(url + endpoint, body, header);
};

export const mpPost = (endpoint, body) => {
  return axios.post(mpUrl + endpoint, body, header);
};

export const getUser = (userName) => {
  let user;
  axios
    .get(`${url}user/${userName}`)
    .then((res) => res)
    .then((data) => {
      user = data.data;
    })
    .catch((err) => console.log(err));
  return user;
};

export const getBuyData = (userName) => {
  return axios.get(`${url}user/buyData/${userName}`);
};

export const changeStock = (productId, newStock) => {
  return axios.post(`${url}products/actualizeStock/${productId}/${newStock}`);
};

export const buyProduct = (product) => {
  return axios.post(`${url}products/buy/${product.id}`);
};

export const buyProductMP = (preference, url) => {
  return axios.post(url, preference);
};

export const buyProductQuantity = (product) => {
  return axios.post(`${url}products/buy/${product.id}/${product.buyQuantity}`);
};

export const login = (username, password) => {
  return axios.post(
    `${url}user/login`,
    {
      username,
      password,
    },
    header
  );
};

export const updateUser = (user) => {
  return axios.put(
    `${url}user/update`,
    {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      address: user.address,
      email: user.email,
      phone: user.phone,
      favorites: user.favorites,
      shopping: user.shopping,
      cart: user.cart,
    },
    header
  );
};

export const register = (user) => {
  return axios.post(
    `${url}user/add-user`,
    {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      address: user.address,
      email: user.email,
      phone: user.phone,
      favorites: [],
      shopping: [],
      cart: [],
    },
    header
  );
};

export const addShopping = (user, productList) => {
  return axios.post(
    `${url}shopping/add-shopping`,
    {
      user: user.userName,
      productList: productList,
    },
    header
  );
};

export const getShopping = (user) => {
  return axios.get(`${url}${user.username}/shopping`, header);
};
