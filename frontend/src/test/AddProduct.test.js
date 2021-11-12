import React from "react";
import AddProduct from "../components/screens/AddProduct";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";

const mockStore = configureStore([]);
Enzyme.configure({ adapter: new Adapter() });

describe("<AddProduct />", () => {
  let products;

  const product = {
    ownerUsername: "AddProduct ownerUsername test",
    name: "AddProduct name test",
    description: "AddProduct descripcion test",
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
        <AddProduct />
      </Provider>
    );
    expect(component.contains(<AddProduct />)).toEqual(true);
  });
});
