import {
  getBuyData,
  post,
  mpPost,
  buyProductQuantity,
  get,
  changeStock,
  getShippingPrice,
} from "../api/Api";
import { addShooppingService } from "./ShoppingService";

export const addProduct = (
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
) => {
  let storage = JSON.parse(localStorage.getItem("user"));
  let product = {
    ownerUsername: storage.username,
    name: nombre,
    description: descripcion,
    stock: stock,
    caracteristica: caracteristica,
    price: precio,
    imgSrc: imgSrc,
    category: category.replace(" ", ""),
  };
  post(`products/add/${storage.id}`, product)
    .then((res) => {
      addProductToStore(res.data);
      setTittle("Se ha añadido " + product.name);
      setmessage("el producto fue guardado con exito");
      setmodalShow(true);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const actualizeStock = (product) => {
  changeStock(product.id, product.stock - product.buyQuantity)
    .then((result) => console.log(result))
    .catch((er) => console.log(er));
};

export const actualizeCartStock = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  cart.forEach((prod) => {
    changeStock(prod.id, prod.stock - prod.buyQuantity)
      .then((result) => console.log(result))
      .catch((er) => console.log(er));
  });
};

export const getOwnerData = (product, setOwnerData, sendMailSingle, user) => {
  getBuyData(product.ownerUsername)
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      setOwnerData(data);
      sendMailSingle(product, data, user);
    })
    .catch((err) => console.log(err));
};

export const getOwnerDataCart = (cart, setOwnerData, sendMailSingle, user) => {
  let owners = [];
  let currentOwner;
  cart.forEach((product) =>
    getBuyData(product.ownerUsername)
      .then((res) => res.data)
      .then((data) => {
        currentOwner = { product: product.name, data: data };
        owners.push(currentOwner);
        setOwnerData(owners);
        console.log("mail enviado");
        sendMailSingle(product, data, user);
      })
      .catch((err) => console.log(err))
  );
};

export const buyProductNow = (product, setOwnerData, user) => {
  getBuyData(product.ownerUsername)
    .then((data) => {
      setOwnerData(data.data);
    })
    .catch((err) => console.log(err));
  buyProductQuantity(product)
    .then((data) => {
      localStorage.setItem("mpBuy", JSON.stringify(product));
      localStorage.setItem("lastBuy", "single");
    })
    .catch((err) => console.log(err));
  addShooppingService(user, [product]);
};

export const buymp = (product, setButtonUrl) => {
  mpPost("payment/new", {
    name: `${product.name}`,
    unit: `${product.buyQuantity}`,
    price: `${product.price}`,
    img: `${product.imgSrc}`,
    id: `${product.id}`,
    description: `${product.description}`,
    category: `${product.category}`,
    user: localStorage.getItem("user"),
  }).then((result) => {
    setButtonUrl(result.data);
    localStorage.setItem("mpBuy", JSON.stringify(product));
    localStorage.setItem("lastBuy", "single");
  });
};

export const buyAllProductsMP = (cartstate, productsBuy, setButtonUrl) => {
  console.log(cartstate);
  const name = cartstate.reduce(
    (name, product) => name + "," + product.name,
    ""
  );
  const price = cartstate.reduce(
    (price, product) => price + product.price * product.buyQuantity,
    0
  );
  mpPost("payment/new", {
    name: `${name}`,
    unit: 1,
    price: `${price}`,
    img: ``,
    id: ``,
    description: `carrito con ${name}`,
    category: `all`,
    user: localStorage.getItem("user"),
  }).then((result) => {
    setButtonUrl(result.data);
    localStorage.setItem("mpBuy", JSON.stringify(cartstate));
    localStorage.setItem("lastBuy", "cart");
  });
};

export const buyAllProductsNow = (cartstate, productsBuy, history, user) => {
  cartstate.map((product) =>
    buyProductQuantity(product)
      .then((response) => {
        productsBuy = productsBuy + `${product.name} ${response.data} `;
      })
      .catch((err) => {
        console.log(err);
      })
  );
  localStorage.setItem("mpBuy", JSON.stringify(cartstate));
  localStorage.setItem("lastBuy", "cart");
  addShooppingService(user, cartstate);
  history.push("/success");
};

export const getCategories = (setCategories) => {
  const URL = "products/categories";
  get(URL)
    .then((res) => res.data)
    .then((data) => setCategories(data))
    .catch((err) => console.log(err));
};

export const findByCategory = (setProducts, product, category) => {
  const URL = `products/get/${category}/${product}`;
  get(URL)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .then((data) => setProducts(data))
    .catch((err) => console.log(err));
};
export const findByMyCategory = (setProducts, category) => {
  const URL = `products/get/${category}`;
  get(URL)
    .then((res) => res.data)
    .then((data) => setProducts(data))
    .catch((err) => console.log(err));
};

export const searchProduct = (setProducts, param) => {
  const URL = `products/resultsearch/${param.product.replace(/\+|%20/g, "-")}`;
  get(URL)
    .then((res) => res.data)
    .then((data) => setProducts(data))
    .catch((err) => console.log(err));
};

export const getShippingCost = (postalCode, quantity, setShipping) => {
  getShippingPrice(postalCode, quantity)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.tarifaConIva);
      return data.tarifaConIva;
    })
    .then((tarifa) => {
      console.log(tarifa.total);
      setShipping(tarifa.total);
    })
    .catch((err) => console.log(err));
};
