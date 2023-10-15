## Redux ShoppingCart-app with no API

Watch the tutorial from min 24 till 37
https://www.youtube.com/watch?v=zrs7u6bdbUw

# Location in Mac:
/Users/carlosinfante/Desktop/coding-projects/winc-academy/frontend-course/MODULE9 - DEBUGGING and DOMAIN MODELING/REVIEW/redux/tutorials/2. NoAPI/Redux-Shopping-Cart-App-Nikhil

# Location in GitHub:
https://github.com/carloscfgos1980/React-Redux-Toolkit-shoppingcart-Nikhil_tutorial

# Goals:
- Redux Toolkit. It an immer package that allows us to mutate the state. 
- ConfigureStore (reducer, export actions, export store)
- Store
- Form (very simple, only submit button)
- onSubmit event
- CSS. Form and buttons
- Add items to the store. Check if the product exist. If it does, just increase the amount and the total value. If it does not, then and the product to the shopping list. I like this method, it is very consistent!
- Show the amount of item in the shopping cart. Create a state for this and update it inside the add items to the list.
- Erase the item from the list is the amount is 1 or decrease the amount of item from the list if the amount is more than 1
- forEach in order to add the total amount



## Steps:

0. Clean the app. Same as other react app "cleanning". DO NOT DELETE App.css coz it will add extra margin.
   N: In this app, the style are not defined in App.css as usual, instead the style is applied in separately .css files that are attached to the components.

## 1. Create functionality to Log in

## 2. Log out functionability

1. Download the setup app from:
   https://github.com/Nikhilthadani/Redux-Shopping-Cart-App
   N: Check for starting app.

2. npm install

3. Create the auth-slice in the store folder. Check src/store/auth-slice.
   N: Other developers prefer to label this folder as redux.
   In this case inside redux there is a file named index.js. Other developers name this very same file store and redux to the folder that contains it.
   Nikhil uses "auth-slice" but most of the people would use camel notation so it would be like "authSlice".
   Nijhil also doesnt use the distress method on the export actions. Explanation in "src/store/auth-slice.js" and "src/store/index.js"

3.1 - Create reducer "login".
const authSlice = createSlice({
    name: 'auth',
    initialState: { isLoggIn: false },
    reducers: {
        login(state) {
            state.isLoggIn = true;
        },

3.2 - Create reducer "logout".
3.3 - Export actions. There are 2 ways of doing this. Explanation in auth-slice.js:
export const authActions = authSlice.actions;
/*
This from above could be also like this
export const {login, logout} = authSlice.actions;

N: By distrassing the function, we can call the function directly. Example in src/store/index.js
*/

3.4 Export this slice (configurestore)
export default authSlice;

4. src/store/index.js: Create the store from the configureStore.
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,

5. Pass the state of <isLogging> to the app so it will show the Log in form when we are logged out and it wil will show the cart when we are logged in
5.1 useSelect hook to grab the state of <isLoggIn> from the store
  const isLoggedIn = useSelector(state => state.auth.isLoggIn);)
5.2 Condictional rendering to either show the Log in form or the shopping cart
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}


6. src/components/Auth.js In this example we don grab any value from the form. Only attact an event of submit so it will dispatch an action that change the state of <isLoggIn> and allow as to switch from the form layout to the shopping cart:
6.1 - Create the eventHandler to submit the action:
<form onSubmit={handleSubmit}>

6.2 - Import useDispatch

6.3 - Create the function "handleSubmit". Checkout notes in this file
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.login());
    /* If we distress the actions export in the configureStore(auth-slice), then we could do it just like this
    dispatch(login());
    */
  }

## 2. Log out functionability. Explanation 1:06 hr -1:08

1. src/components/Header.js: "
1.1 - Create a button inside the list:
   <li>
   <button className="logout-btn">Logout</button>
   </li>
1.2 - Create the eventHandler attached to the button
<button onClick={logoutHandler} className="logout-btn">Logout</button>

1.3 - Create constanst "dispatch" and call "useDispatch"
const dispatch = useDispatch();

1.4 Create function "logoutHandler" ( lin 8 - 10)

2. Style the button:
   src/components/Layout.css (lin 13 - 20)
