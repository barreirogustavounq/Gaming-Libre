import React from "react";
import UserDetails from "../components/screens/UserDetails";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";

const mockStore = configureStore([]);
Enzyme.configure({ adapter: new Adapter() });

describe("<UserDetails />", () => {
  let user;

  const TestUser = {
    firstName: "test",
    lastName: "test",
    username: "test",
    password: "test",
    address: "test",
    email: "test@test.com",
    phone: 1111111,
  };
  beforeEach(() => {
    user = mockStore({
      user: TestUser,
    });
  });
  it("should render with buyProduct", () => {
    const component = shallow(
      <Provider store={user}>
        <UserDetails />
      </Provider>
    );
    expect(component.contains(<UserDetails />)).toEqual(true);
  });
});
