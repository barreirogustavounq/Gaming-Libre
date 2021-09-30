import "./App.css";
import Nav from "./components/Nav";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./components/screens/Login";
import Home from "./components/screens/Home";
import Footer from "./components/Footer";
import Register from "./components/screens/Register";
import ResultSearch from "./components/screens/ResultSearch";
import UserDetails from "./components/screens/UserDetails";
import AddProduct from "./components/screens/AddProduct";
import { loginAction } from "./components/Redux/UserDuck";
import Product from "./components/screens/Product";
import Cart from "./components/screens/Cart";
const App = ({ user }) => {
  const Routes = () => {
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products/resultsearch/:product">
          <ResultSearch />
        </Route>
        <Route exact path="/product/:id">
          <Product />
        </Route>
        <Route exact path="/products/add-product">
          <AddProduct />
        </Route>
        <Route exact path="/user/count/:id">
          {user ? <UserDetails /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/user/cart">
          <Cart />
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
      <header>
        <Nav user={user} />
      </header>
      <Routes />
      <Footer />
    </>
  );
};
const mapState = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapState, { loginAction })(App);
