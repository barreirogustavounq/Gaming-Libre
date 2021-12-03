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
  //console.log(user);
  //console.log(productList);
  return axios.post(
    `${url}shopping/add-shopping`,
    {
      user: user.username,
      productList: productList,
    },
    header
  );
};

export const getShippingPrice = (postalCode) => {
    return axios.get('https://apisqa.andreani.com/v1/tarifas?cpDestino=4440&contrato=400006709&bultos%5B1%5D%5B1001%5D=1200', {
        headers:{
            "Access-Control-Allow-Origin": "*"
        },
        auth: {
            username: 'lautariver35@gmail.com',
            password: 'TIP123456'
        }
    });
}


export const getShopping = (user) => {
  return axios.get(`${url}${user.username}/shopping`, header);
};
