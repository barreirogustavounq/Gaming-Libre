import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import ReactRouter from "react-router";
import UserDetails from "../components/screens/UserDetails";

test("renders content", () => {
  jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "1234" });

  render(<UserDetails />);
});
