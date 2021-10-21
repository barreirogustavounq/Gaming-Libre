import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Product from "../components/screens/Product";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

const mockStore = configureStore([]);
Enzyme.configure({ adapter: new Adapter() });

describe("<Product />", () => {
  let products;

  beforeEach(() => {
    products = mockStore({
      products: [],
    });
  });
  it("should render Product", () => {
    const component = shallow(
      <Provider store={products}>
        <Product />
      </Provider>
    );
    expect(component.contains(<Product />)).toEqual(true);
  });
});
