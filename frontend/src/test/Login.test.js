import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";

import Login from "../components/screens/Login";

const mockStore = configureStore([]);

describe("My Connected React-Redux Component", () => {
  let user;
  let component;

  beforeEach(() => {
    user = mockStore({
      user: "sample text",
    });

    component = renderer.create(
      <Provider store={user}>
        <Login />
      </Provider>
    );
  });

  it("should render with given state from Redux store", () => {});

  it("should dispatch an action on button click", () => {});
});
