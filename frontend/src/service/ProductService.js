import {
    buyProduct,
    getBuyData,
    post,
    mpPost,
    buyProductQuantity,
    get, buyProductMP,
} from "../api/Api";
import mercadopago from "mercadopago";

const accesTokenMP = "TEST-4470583120056903-092823-e8250e22361adffae3967c20cd11f87f-240182164"
const mpApi = `https://api.mercadopago.com/preferences?access_token=${accesTokenMP}`
// Crea un objeto de preferencia
let preference = {
    items: [
        {
            title: 'Mi producto',
            unit_price: 100,
            quantity: 1,
        }
    ]
};



export const addProduct = (
  nombre,
  descripcion,
  precio,
  stock,
  imgSrc,
  history,
  addProductToStore,
  category
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
      alert("el producto fue guardado con exito");
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getOwnerData= (product, setOwnerData) => {
    getBuyData(product.ownerUsername)
        .then((data) => {
            setOwnerData(data.data);
        }).catch((err) => console.log(err));
}

export const buyProductNow = (product, setOwnerData, setBuyNow, buyNow) => {
  getBuyData(product.ownerUsername)
    .then((data) => {
      setOwnerData(data.data);
    })
    .catch((err) => console.log(err));
  console.log(product)
  buyProduct(product)
    .then((data) => {
      setBuyNow(!buyNow);
    })
    .catch((err) => console.log(err));
};

export const buymp = (product, setButtonUrl) => {
    mpPost('payment/new',{
        "name": `${product.name}`,
        "unit": `${product.buyQuantity}`,
        "price": `${product.price}`,
        "img": `${product.imgSrc}`,
        "id": `${product.id}`,
        "description": `${product.description}`,
        "category": `${product.category}`,
        "user":localStorage.getItem("user")
    }).then((result)=> {
        setButtonUrl(result.data)
        localStorage.setItem("mpBuy", JSON.stringify(product))
    })
}
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
