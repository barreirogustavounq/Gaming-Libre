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

export const getBuyData = (userName) => {
  return axios.get(`${url}user/buyData/${userName}`);
};

export const changeStock = (productId, newStock) => {
  return axios.post(`${url}products/actualizeStock/${productId}/${newStock}`);
};

export const buyProductQuantity = (product) => {
    let user = JSON.parse(localStorage.getItem("user"))
  return axios.post(`${url}products/buy/${product.id}/${product.buyQuantity}/${user.id}`);
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
export const getBuys= (setBuys) => {
    let user = JSON.parse(localStorage.getItem("user"))
    return axios.get(`${url}products/getBuys/${user.id}`, header).then(res => {
        setBuys(res.data)
    });
}

export const getPublications= (setPublications) => {
    let user = JSON.parse(localStorage.getItem("user"))
    return axios.get(`${url}products/getPublications/${user.id}`, header).then(res => {
        setPublications(res.data)
    });
}

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
      city: user.city,
      state: user.state,
      postalCode: user.postalCode,
      birthday: user.birthday,
      cbu: user.cbu,
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
      user: user.username,
      productList: productList,
    },
    header
  );
};

export const getShippingPrice = (postalCode, cantidad) => {
  let bultos = "";
  for (let i = 0; i < cantidad; i++) {
    bultos = bultos.concat(`&bultos[${i}][volumen]=2000`);
  }
  return fetch(
    `https://apisqa.andreani.com/v1/tarifas?cpDestino=${postalCode}&contrato=400006709${bultos}`,
    {
      mode: "cors",
    }
  );
};

export const getShopping = (user) => {
  return axios.get(`${url}${user.username}/shopping`, header);
};
