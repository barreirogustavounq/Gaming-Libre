import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import BuyProduct from "../components/screens/BuyProduct";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";

const mockStore = configureStore([]);
Enzyme.configure({ adapter: new Adapter() });

describe("<BuyProduct />", () => {
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
  test("should render with buyProduct", () => {
    const component = shallow(
      <Provider store={products}>
        <BuyProduct product={product} />
      </Provider>
    );
    console.log(component);
    expect(component.contains(<BuyProduct product={product} />)).toEqual(true);
  });
});
