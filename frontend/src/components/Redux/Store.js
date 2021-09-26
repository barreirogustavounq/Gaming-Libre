import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { getAllProducts, productReducer } from "./ProductDuck";
import { restoreSesion, userReducer } from "./UserDuck";

let rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  restoreSesion()(store.dispatch);
  getAllProducts()(store.dispatch);
  return store;
}
