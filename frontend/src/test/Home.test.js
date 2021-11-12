import React from "react";
import "@testing-library/jest-dom/extend-expect";
import configureStore from "redux-mock-store";
import Home from "../components/screens/Home";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";

const mockStore = configureStore([]);
Enzyme.configure({ adapter: new Adapter() });

describe("<Home />", () => {
  let products;

  const product = {
    ownerUsername: "owner test",
    name: "buyProduct test",
    description: "descripcion test",
    stock: 1,
  };
  beforeEach(() => {
    products = mockStore({
      products: product,
    });
  });
  it("should render with buyProduct", () => {
    const component = shallow(
      <Provider store={products}>
        <Home />
      </Provider>
    );
    expect(component.contains(<Home />)).toEqual(true);
  });
});
