import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notifications from "./components/Notifications";
import { uiActions } from "./store/ui-slice";
let isFirstRender = true;
function App() {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);
  const cart = useSelector(state => state.cart);
  const isLoggedIn = useSelector(state => state.auth.isLoggIn);

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    const sendRequest = async () => {
      //Send state as sending request
      dispatch(uiActions.showNotifications({
        open: true,
        message: 'Sending request',
        type: 'warning'
      }))
      const res = await fetch('https://api-shoppingcart-default-rtdb.firebaseio.com/cartItems.json', {
        method: "PUT",
        body: JSON.stringify(cart)
      }
      );
      const data = await res.json();
      // send state as a Request is successful
      dispatch(uiActions.showNotifications({
        open: true,
        message: 'Sent DATA to DataBase Successfully',
        type: 'success'
      }))
    }
    sendRequest().catch(err => {
      //Send state as error
      dispatch(uiActions.showNotifications({
        open: true,
        message: 'Sending request failed',
        type: 'error'
      }))
    });
  }, [cart])// By puting the cart dependency in the useEffect. it will update everytime we change the state (cart)

  return (
    <div className="App">
      {notification && <Notifications type={notification.type} message={notification.message} />}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
