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
import NotFound from "./components/screens/NotFound";
import Category from "./components/screens/Category";
import SuccessBuyMP from "./components/screens/SuccesBuyMP";
import { FailedBuyMP } from "./components/screens/FailedBuyMP";
import { Buys } from "./components/screens/Buys";
import { Publications } from "./components/screens/Publications";
import ShowProduct from "./components/screens/ShowProduct";

const App = ({ user }) => {
  const Routes = () => {
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/success">
          {user ? <SuccessBuyMP /> : <Redirect to="/" />}
        </Route>
        <Route path="/error">
          {user ? <FailedBuyMP /> : <Redirect to="/" />}
        </Route>
        <Route
          exact
          path={[
            "/products/resultsearch/:category/:product",
            "/products/resultsearch/:category",
          ]}
        >
          <ResultSearch />
        </Route>
        <Route exact path="/product/:id">
          <Product />
        </Route>
        <Route exact path="/show/product">
          {user ? <ShowProduct /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/products/add-product">
          {user ? <AddProduct /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/user/count/:id">
          {user ? <UserDetails /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/user/buys/:id">
          {user ? <Buys /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/user/publications/:id">
          {user ? <Publications /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/user/cart">
          <Cart />
        </Route>
        <Route exact path="/login">
          {!user ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/products/category/:category">
          <Category />
        </Route>
        <Route component={NotFound} />
      </Switch>
    );
  };
  return (
    <>
      <header className="headerLayout">
        <Nav user={user} />
      </header>
      <div className="bodyLayout">
        <Routes />
      </div>
      <div className="footerLayout">
        <Footer />
      </div>
    </>
  );
};
const mapState = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapState, { loginAction })(App);
