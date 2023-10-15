import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

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
