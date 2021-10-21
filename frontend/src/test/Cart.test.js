import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import Cart from "../components/screens/Cart";

const mockStore = configureStore([]);

describe("My Connected React-Redux Component", () => {
  let cart;
  let component;

  beforeEach(() => {
    cart = mockStore({
      cart: [],
    });

    component = renderer.create(
      <Provider store={cart}>
        <Cart />
      </Provider>
    );
  });

  it("should render with given state from Redux store", () => {});
});
