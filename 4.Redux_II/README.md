## Redux ShoppingCart-app API. actions in redux (store)

Watch the tutorial 1:28 - 1:41 hr
https://www.youtube.com/watch?v=zrs7u6bdbUw

Location in Mac:
/Users/carlosinfante/Desktop/coding-projects/winc-academy/frontend-course/MODULE9 - DEBUGGING and DOMAIN MODELING/REVIEW/redux/tutorials/3. API

Location in GitHub:
https://github.com/carloscfgos1980/React-Redux-toolkit-shoppingCart-Api_II

# Goals:
- PUT
- FETCH

# STEPS:
# 1. PUT from the store
1.1 Create file for the action(cart-actions) inside the store

1.2 src/store/cart-actions.js. Importa uiActios (notifications) since we need to call this function from the asynchronomous function to send the data.
import { uiActions } from "./ui-slice";

1.3 src/store/cart-actions.js. Just copy the function we had inside App.js:
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotifications({
            open: true,
            message: 'Sending request',
            type: 'warning'
        })
        );
        const sendRequest = async () => {
            //Send state as sending request
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
        };
        try {
            await sendRequest();
        } catch (err) {
            dispatch(uiActions.showNotifications({
                open: true,
                message: 'Sending request failed',
                type: 'error'
            })
            );
        }
    }
}

1.4 App.js. Call the use Effect with a condiction so it will not loop forever:
 useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch])// By puting the cart  and disppatch as dependencies in the useEffect. it will update everytime we change the state (cart) and an action is dispatched.
  * I need to create another state in cart-slice with initial state as false and change to true everytime we call the reducers (addToCart, removeFromCart)

# 2. FETCH from the store
2.1 src/store/cart-actions.js. Import cartActions and uiActions
import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

2.2 Create the Fetch function:
export const fetchData = () => {
    return async (dispatch) => {
        const fectchHandler = async () => {
            const res = await fetch('https://api-shoppingcart-default-rtdb.firebaseio.com/cartItems.json');
            const data = await res.json();
            return data
        }
        try {
            const cartData = await fectchHandler();
            dispatch(cartActions.replaceData(cartData))
        } catch (err) {
            dispatch(uiActions.showNotifications({
                open: true,
                message: 'Sending request failed',
                type: 'error'
            })
            );
        }
    }
}
dispatch(cartActions.replaceData(cartData)). This will dispatch an action to a reducer that will update the data that will display in the DOM

2.3 App.js. Call a another useEffect
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

N: I Ihave a bug in src/redux/cart-slice.js (lin 36). When I try to update the state, like is in the tutorial. The amount totalQuantity keep increase in the API (backed end)
state.totalQuantity++;

I tried this instead:
state.totalQuantity = state.itemsList.length;

BUT it didnt work!

* This is tutorial does not use Thunk. Nikhil create action from the store but it was not really necesary, it could be also a custom hook just like Net Ninja implemented. It is a very tricky way Nikhil accomplish this. I need to watcht the video several times. I will be not using this method but it is important to know what the hell he did so I know in the future
