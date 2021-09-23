import "./App.css";
import Nav from "./components/Nav";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/screens/Login";
import Home from "./components/screens/Home";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Register from "./components/screens/Register";
import ResultSearch from "./components/screens/ResultSearch";
import UserDetails from "./components/screens/UserDetails";
import AddProduct from "./components/screens/AddProduct";

const App = () => {
  const userName = localStorage.getItem("user");
  const [user, setUser] = useState(null);
  const URL = "http://localhost:8080/user/";

  useEffect(() => {
    axios
      .get(`${URL}${userName}`)
      .then((res) => res)
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const Routes = () => {
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products/resultsearch/:product">
          <ResultSearch />
        </Route>
        <Route exact path="/products/add-product">
          <AddProduct />
        </Route>
        <Route exact path="/user/count/:id">
          {userName ? <UserDetails /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
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
