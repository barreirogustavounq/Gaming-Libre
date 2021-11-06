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

export const buyProductMercadoPago = (product, setOwnerData, setBuyNow, buyNow) => {
    const mercadopago = require('mercadopago')
    mercadopago.configure({
        access_token: "TEST-4470583120056903-092823-e8250e22361adffae3967c20cd11f87f-240182164",
    });
    let preference = {
        external_reference: "ABC",
        //notification_url: "https://hookb.in/r19LWVaW93Hqk2XXkGeg",
        items:[
            {
                id:product.id,
                category_id: product.category,
                title:product.name,
                quantity: product.buyQuantity,
                unit_price: product.price,
                picture_url:product.imgSrc
            }
        ],
        back_urls:{
            success:'https:/localhost:3000',
            failure:'https:/localhost:3000',
            pending:'https:/localhost:3000'
        },
        redirect_urls:{
            success:'https:/localhost:3000',
            failure:'https:/localhost:3000',
            pending:'https:/localhost:3000'
        },
        auto_return:"approved"
    }

    let pref = ''
    mercadopago.preferences.create(preference)
        .then(response => {
            pref = response;
        }).catch(function (error) {
            console.log(error);
        });
    console.log(pref)

    return pref;

}


export const buymp = (product, setButtonUrl) => {
    mpPost('payment/new',{
        "name": `${product.name}`,
        "unit": `${product.buyQuantity}`,
        "price": `${product.price}`
    }).then((result)=> {
        console.log(result.data)
        setButtonUrl(result.data)
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
