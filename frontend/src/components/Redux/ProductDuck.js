import { get } from "../../api/Api";

let initialData = {
  fetching: false,
  products: [],
};

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
const GET_PRODUCTS_ERROR = "GET_PRODUCTS_ERROR";
const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const ADD_PRODUCT = "ADD_PRODUCT";

export const productReducer = (state = initialData, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, fetching: true };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, fetching: false, products: action.payload };
    case GET_PRODUCTS_ERROR:
      return { ...state, fetching: false, products: action.payload };
    case UPDATE_PRODUCTS:
      return { ...state, fetching: false, products: action.payload };
    case UPDATE_PRODUCT:
      return {
        ...state,
        fetching: false,
        products: state.products
          .filter((prod) => prod.id !== action.payload.id)
          .concat([action.payload]),
      };
    case ADD_PRODUCT:
      return {
        ...state,
        fetching: false,
        products: state.products.concat([action.payload]),
      };
    default:
      return state;
  }
};

export const getAllProducts = () => (dispatch, getState) => {
  dispatch({
    type: GET_PRODUCTS,
  });
  get("products/getAll")
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: GET_PRODUCTS_ERROR,
        payload: error.message,
      });
    });
};
export const updateProcts = (products) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_PRODUCTS,
    payload: products,
  });
};

export const updateProduct = (product) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_PRODUCT,
    payload: product,
  });
};

export const addProductToStore = (product) => (dispatch, getState) => {
  dispatch({
    type: ADD_PRODUCT,
    payload: product,
  });
};
