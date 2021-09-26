//Constantes
import { login } from "../../api/Api";

let initialData = {
  fetching: false,
  loggedIn: false,
  user: null,
};

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const UPDATE_USER = "UPDATE_USER";
const LOGOUT = "LOGOUT";
//reducer

export const userReducer = (state = initialData, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, fetching: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        fetching: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loggedIn: false,
        fetching: false,
        user: null,
        error: action.payload,
      };
    case UPDATE_USER:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: undefined, loggedIn: false };
    default:
      return state;
  }
};

// actions
export const restoreSesion = () => (dispatch) => {
  let storage = localStorage.getItem("user");
  storage = JSON.parse(storage);
  if (storage) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: storage,
    });
  }
};

export const loginAction = (username, password) => (dispatch, getState) => {
  dispatch({
    type: LOGIN,
  });
  return login(username, password)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.message,
      });
    });
};
export const updateUserStorage = (user) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_USER,
    payload: user,
  });
};

export const logoutAction = () => (dispatch, getState) => {
  dispatch({
    type: LOGOUT,
  });
};
