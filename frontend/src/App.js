import "./App.css";
import axios from "axios";
import Nav from "./components/Navbar/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

const App = () => {
  const URL = "http://localhost:8080/user/test1";
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
