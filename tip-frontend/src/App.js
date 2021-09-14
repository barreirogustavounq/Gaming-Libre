import "./App.css";
import axios from "axios";
import Nav from "./components/Navbar/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";

const App = () => {
  const URL = "http://localhost:8080/users";

  const Routes = () => {
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    );
  };
  axios
    .get(URL)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
  return (
    <>
      <Router>
        <header>
          <Nav />
        </header>
        <Routes />
        <Footer />
      </Router>
    </>
  );
};

export default App;
