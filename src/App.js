import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Checkout from "./components/Checkout/Checkout";
import Dashboard from "./components/Dashboard/Dashboard";
import Deals from "./components/Deals/Deals";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Orders from "./components/Orders/Orders";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Products from "./components/Products/Products";
import Search from "./components/Search/Search";

export const UserContext = createContext();

function App() {
  const [loggedUserData, setLoggedUserData] = useState({
    isLoggedIn: false,
    userName: "",
    email: "",
    image: "",
    error: "",
    handleSignOut: null,
  });

  return (
    <UserContext.Provider value={[loggedUserData, setLoggedUserData]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header></Header>
            <Search></Search>
            <Products></Products>
          </Route>
          <PrivateRoute path="/admin">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <PrivateRoute path="/checkout/:id">
            <Header></Header>
            <Checkout></Checkout>
          </PrivateRoute>
          <PrivateRoute path="/orders">
            <Header></Header>
            <Orders></Orders>
          </PrivateRoute>
          <PrivateRoute path="/deals">
            <Header></Header>
            <Deals></Deals>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
