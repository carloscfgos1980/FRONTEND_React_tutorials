import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";

function App() {
  // to check the values
  const isLoggedIn = useSelector(state => state.auth.isLoggIn);
  console.log("isLoggedIn", isLoggedIn)

  const cartItems = useSelector(state => state.cart.itemsList);
  console.log("itemList", cartItems)
  return (
    <div className="App">
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
