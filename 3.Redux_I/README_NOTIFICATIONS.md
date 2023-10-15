## NOTIFICATIONS

N: Este indio ha formao un reguero que ya me dio dolor de cabeza

Watch the tutorial from 1:13 -1:28
https://www.youtube.com/watch?v=zrs7u6bdbUw

# Goals:
- Apply notifications
- PUT action (fectching)

# STEPS
1. Apply notifications:
1.1 - Google type:
https://mui.com/

1.2 - Copy the command and run it in the terminal

1.3 - Create a slice(ui-slice) to handle the notifications:
const uiSlice = createSlice({
    name: 'ui',
    initialState: { notification: null },
    reducers: {
        showNotifications(state, action) {
            state.notification = {
                message: action.payload.message,
                type: action.payload.type,
                open: action.payload.open
            }
        }
    }
}

1.4 Create a component to handle notifications:
const Notifications = ({ type, message }) => {
    const dispatch = useDispatch();
    const notification = useSelector(state => state.ui.notification);
    const handleClose = () => {
        dispatch(uiActions.showNotifications({
            open: false
        }))
    }
    return (
        <div>
            {notification.open && <Alert onClose={handleClose} severity={type}>{message}</Alert>}
        </div>
    );
}
1.4.1 {notification.open && <Alert // Condictional rendering to show the notification only when open is set to be true.
1.4.2 const Notifications = ({ type, message }) => {// ttpe and message are the parameter that willbe used when Notification is called back.
1.4.3 handleClose send a dispatch to swith open to false so we can close the notification

1.5 App.js. Implement the notification inside the useEffect function:
* Notification funtion is called 3 times:
- Before the fetching action: message: 'Sending request', type: 'warning'
- After data is fetched: message: 'Sent DATA to DataBase Successfully', type: 'success'
- Cathing an error: message: 'Sending request failed', type: 'error'

  useEffect(() => {
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
  }, [cart])

2. App.js UseEffect Function:

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

* Get rid of the Alert message from the beginning
- Create a variable out side the app function:
    let isFirstRender = true;

- Inside the useEffect. Create the followed condiction:
if (isFirstRender) {
isFirstRender = false;
return;
}

* So much shit to add the fucking notifications... already tired I hope I can just copy next time...
