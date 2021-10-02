let initialData = {
  fetching: false,
};

const GET_CART = "GET_CART";
const GET_CART_SUCCESS = "GET_CART_SUCCESS";
const GET_CART_ERROR = "GET_CART_ERROR";
const ADD_CART = "ADD_CART";
const DELETE_CART = "DELETE_CART";
const DELETE_ALL = "DELETE_ALL"

export const deleteProductOfArray = (product, array) => {
  console.log(product);
  let result = array.filter((prod) => product.id !== prod.id);
  console.log(result);
  return result;
};

export const cartReducer = (state = initialData, action) => {
  switch (action.type) {
    case GET_CART:
      return { ...state, fetching: true };
    case GET_CART_SUCCESS:
      return { ...state, fetching: false, cart: action.payload };
    case GET_CART_ERROR:
      return { ...state, fetching: false, cart: [] };
    case ADD_CART:
      return {
        ...state,
        fetching: false,
        cart: action.payload,
      };
    case DELETE_CART:
      return {
        ...state,
        fetching: false,
        cart: action.payload,
      };
    case DELETE_ALL:
      return {
        ...state,
        fetching:false,
        cart:[]
      }
    default:
      return state;
  }
};

export const getCart = () => (dispatch, getState) => {
  dispatch({
    type: GET_CART,
  });
  if (localStorage.getItem("cart")) {
    dispatch({
      type: GET_CART_SUCCESS,
      payload: JSON.parse(localStorage.getItem("cart")),
    });
  } else {
    dispatch({
      type: GET_CART_ERROR,
    });
    localStorage.setItem("cart", JSON.stringify([]));
  }
};

export const addProduct = (product) => (dispatch, getState) => {
  debugger;
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart.length > 0 && cart.some(e => e.id === product.id)) {
    let index= cart.findIndex(obj => obj.id === product.id)
    cart[index].buyQuantity = cart[index].buyQuantity + product.buyQuantity
  }else {
    cart = cart.concat([product]);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  dispatch({
    type: ADD_CART,
    payload: cart,
  });
};
export const deleteProduct = (product) => (dispatch, getState) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  //console.log(cart);
  //console.log(product);
  dispatch({
    type: DELETE_CART,
    payload: deleteProductOfArray(product, cart),
  });
  //console.log(deleteProductOfArray(product, cart));

  localStorage.setItem(
    "cart",
    JSON.stringify(deleteProductOfArray(product, cart))
  );
};

export const deleteAll = () => (dispatch, getState) => {
  localStorage.removeItem("cart")
  //console.log(cart);
  //console.log(product);
  dispatch({
    type: DELETE_ALL,
    payload: deleteAll(),
  });
  //console.log(deleteProductOfArray(product, cart));

  localStorage.setItem("cart", JSON.stringify([]));
};
