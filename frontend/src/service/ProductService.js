import {
  buyProduct,
  getBuyData,
  post,
  mpPost,
  buyProductQuantity,
  get,
  changeStock,
} from "../api/Api";

const accesTokenMP =
  "TEST-4470583120056903-092823-e8250e22361adffae3967c20cd11f87f-240182164";
const mpApi = `https://api.mercadopago.com/preferences?access_token=${accesTokenMP}`;
// Crea un objeto de preferencia
let preference = {
  items: [
    {
      title: "Mi producto",
      unit_price: 100,
      quantity: 1,
    },
  ],
};

export const addProduct = (
  nombre,
  descripcion,
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
  let storage = localStorage.getItem("user");
  storage = JSON.parse(storage);
  let product = {
    ownerUsername: storage.username,
    name: nombre,
    description: descripcion,
    stock,
    price: precio,
    imgSrc: imgSrc,
    category: category.replace(" ", ""),
  };
  post("products/add", product)
    .then((res) => {
      console.log(res);
      addProductToStore(res.data);
      setTittle("Se ha añadido " + product.name);
      setmessage("el producto fue guardado con exito");
      setmodalShow(true);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getOwnerData = (product, setOwnerData) => {
  getBuyData(product.ownerUsername)
    .then((data) => {
      setOwnerData(data.data);
    })
    .catch((err) => console.log(err));
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

export const getOwnerDataCart = (cart, setOwnerData) => {
  let owners = [];
  cart.forEach((product) =>
    getBuyData(product.ownerUsername)
      .then((data) => {
        owners.push(data.data);
        setOwnerData(owners);
      })
      .catch((err) => console.log(err))
  );
};

export const buyProductNow = (product, setOwnerData) => {
  getBuyData(product.ownerUsername)
    .then((data) => {
      console.log(data.data);
      setOwnerData(data.data);
    })
    .catch((err) => console.log(err));
  console.log(product);
  buyProduct(product)
    .then((data) => {
      localStorage.setItem("mpBuy", JSON.stringify(product));
      localStorage.setItem("lastBuy", "single");
    })
    .catch((err) => console.log(err));
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

export const buyAllProductsMP = (
  cartstate,
  productsBuy,
  deleteAll,
  setButtonUrl
) => {
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

export const buyAllProductsNow = (cartstate, productsBuy, deleteAll) => {
  cartstate.map((product) =>
    buyProductQuantity(product)
      .then((response) => {
        productsBuy = productsBuy + `${product.name} ${response.data} `;
        alert(productsBuy);
      })
      .catch((err) => {
        console.log(err);
      })
  );
  deleteAll();
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
