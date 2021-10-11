import {
  buyProduct,
  getBuyData,
  post,
  buyProductQuantity,
  get,
} from "../api/Api";

export const addProduct = (
  nombre,
  descripcion,
  stock,
  precio,
  imgSrc,
  history,
  addProductToStore
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
  };
  post("products/add", product)
    .then((res) => {
      console.log(res);
      addProductToStore(res.data);
      alert("el producto fue guardado con exito");
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const buyProductNow = (product, setOwnerData, setBuyNow, buyNow) => {
  getBuyData(product.ownerUsername)
    .then((data) => {
      setOwnerData(data.data);
    })
    .catch((err) => console.log(err));
  buyProduct(product)
    .then((data) => {
      setBuyNow(!buyNow);
    })
    .catch((err) => console.log(err));
};

export const buyAllProductsNow = (cartstate, productsBuy, deleteAll) => {
  cartstate.map((product) => {
    buyProductQuantity(product)
      .then((response) => {
        productsBuy = productsBuy + `${product.name} ${response.data} `;
        alert(productsBuy);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  deleteAll();
};

export const searchProduct = (setproducts, param) => {
  const URL = `products/resultsearch/${param.product.replace(/\+|%20/g, "-")}`;
  get(URL)
    .then((res) => res.data)
    .then((data) => setproducts(data))
    .catch((err) => console.log(err));
};
