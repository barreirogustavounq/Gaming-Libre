import "./App.css";
import Nav from "./components/Navbar/Nav";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Footer from "./components/Footer";
import {useEffect, useState} from "react";
import ResultSeach from "./components/ResultSeach";
import UserDatails from "./components/tools/UserDetails";
import axios from "axios";
import Register from "./components/Register/Register";

const App = () => {
    const userName = localStorage.getItem('user')
    const [user, setUser] = useState(null)
    const URL = "http://localhost:8080/user/"

    useEffect(() => {
        axios
            .get(`${URL}${userName}`)
            .then((res) => res)
            .then((data) => {
                setUser(data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const Routes = () => {
        return (
            userName ?
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/products/resultsearch/:product">
                        <ResultSeach/>
                    </Route>
                    <Route exact path="/user/count/:id">
                        <UserDatails/>
                    </Route>
                </Switch> :
                <Switch>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                    <Route exact path="/register">
                        <Register/>
                    </Route>
                </Switch>
        );
    };
    return (
        <>
            <Router>
                <header>
                    <Nav user={user}/>
                </header>
                <Routes/>
                <Footer/>
            </Router>
        </>
    );
};

export default App;
