import "./App.css";
import axios from "axios";
import Nav from "./components/Navbar/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import ResultSeach from "./components/ResultSeach";
import UserDatails from "./components/tools/UserDetails";
import AddProduct from "./components/tools/AddProduct";

const App = () => {
  const URL = "http://localhost:8080/user/GusBa1654321";
  const [user, setuser] = useState(null);

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => res)
      .then((data) => {
        setuser(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Routes = () => {
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products/resultsearch/:product">
          <ResultSeach />
        </Route>
        <Route exact path="/products/add-product">
          <AddProduct />
        </Route>
        <Route exact path="/user/count/:id">
          <UserDatails />
        </Route>
      </Switch>
    );
  };
  return (
    <>
      <Router>
        <header>
          <Nav user={user} />
        </header>
        <Routes />
        <Footer />
      </Router>
    </>
  );
};

export default App;
