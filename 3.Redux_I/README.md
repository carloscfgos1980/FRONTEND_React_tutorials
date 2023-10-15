## Redux ShoppingCart-app API

## There are two way of doing the API

- The reducer must be pure and side effect free and synchronous function always. If we have an HTTP call which is an asynchronous task to such type of code must not go through the reducer functions.
- We have to options to put the asynchronous code.

1. Inside the component using the useEffect hook like we can do inside "Product.js", when ever we are sending the data to the cart.
2. Create an action creator. This would allow us to run a asynchronous code

Watch the tutorial from 1:08 hr to 1:41 hr
https://www.youtube.com/watch?v=zrs7u6bdbUw

## Using the useEffect inside a component (App.js)

## 1. POST

1. Create the API. Details in README_CREATE_API.md
2. src/App.js:
   2.1 - Delete:
   const cartItems = useSelector(state => state.cart.itemsList);

2.2 - Create useEffect to post the data in the API. (lin 12 -17).

3. Functionability for the notifications. Details in README_NOTIFICATIONS.md

N: Hacer las notifiaciones son un dolor de huevos.
