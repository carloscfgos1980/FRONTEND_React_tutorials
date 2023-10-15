## Redux ShoppingCart-app with no API

Watch the tutorial from min 37 till 1:08 hr
https://www.youtube.com/watch?v=zrs7u6bdbUw

# Goals:
- Add items to the store. Check if the product exist. If it does, just increase the amount and the total value. If it does not, then and the product to the shopping list. I like this method, it is very consistent!
- Show the amount of item in the shopping cart. Create a state for this and update it inside the add items to the list.
- Erase the item from the list is the amount is 1 or decrease the amount of item from the list if the amount is more than 1
- forEach in order to add the total amount


# 1. Add items to the store. Explanation: min 37 - 48

1. src/store/index.js: Create a file "cart-slice.js"

1.1 - Create the function "cartSlice".
1.2 Export the actions (reducers):
export const cartActions = cartSlice.actions;

1.3 - Export this configureStore:
export default cartSlice;

1.4 - Create all the initial states (line 6 - 10).
1.5 - Create reducers.

1.5.1 - Create the reducer to add items to the car:
addToCart(state, action)
1.5.2 - Create a const that will store the data (payload) that comes from the submit button.
const newItem = action.payload;

1.5.3 - Check if the item already exist:

                const existingItem = state.itemsList.find((item) => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }

1.5.4 - ELSE add the item:

                    state.itemsList.push({
                    name: newItem.name,
                    id: newItem.id,
                    quantity: 1,
                    totalPrice: newItem.price,
                    price: newItem.price
                });

N: Mutate the state. changed so it will show or not in the layout cart list once we make the changes (lin 13):
state.changed = true;

2. src/store/index.js: Add cart-slide to the store (lin 13):
   cart: cartSlice.reducer,

3. src/components/Product.js:
   3.1 - Add eventHandler to the button:
   <button onClick={addToCart}>Add to cart</button>

3.2 - Call useDispatch

3.3 - Create "addToCart". (lin 9 - 21). Explanation in "src/components/Product.js".
  const addToCart = () => {
    dispatch(
      cartActions.addToCart({
        /*
  If we distress the actions in cart-slice the we can just do:
  "addToCart" instead of "cartActions.addToCart"
  */
        name, // it really is "name:name," but in JXS is not needed so we only do "name,"
        id,
        price,
      })
    );
  };


# 2. Increase the amount of items. Explanation min 48 - 50

1. src/store/cart-slice.js:Change the state of the totalQuantity(line 30)

state.totalQuantity++;

N: We do it with the same reducer coz we just need to update "state.totalQuantity". We do it next to add new item to the cart so it is in the else statement.

2. src/components/Cart.js. Create a constant that containts the totalQuantity state (in the store) by using useSelector.
   const quantity = useSelector(state => state.cart.totalQuantity);

3. Display the amount of items on the DOM
<h3>Cart: {quantity} Items</h3>

This just display the amount of type of the items(in this case the laptops brands). It doenst display the total amount.
If we want to show the whole amount we need to use the reduce method on itemsList.totalQuantity

# 3. Show cart min. Explanation: 50-53

3.1 CartItems.js Create a const to grab the value in the store that contains the the array of objects (itemList) by using useSelector:
   const cartItems = useSelector(state => state.cart.itemsList);

3.2 CartItems.js. Map "cartItems" in order to send to "CartItem.js" the following value. We structure all the data inside <ul> and <li> so the data to be show will have this structure. Very smart!:
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {" "}
            <CartItem
              quantity={item.quantity}
              id={item.id}
              price={item.price}
              total={item.totalPrice}
              name={item.name}
            />{" "}
          </li>
        ))}
      </ul>

3.3 Get the data from the mapping in <CartItems.js> into the function (CartItem)
const CartItem = ({ name, quantity, total, price, id }) => {

3.4 Return the values that will be shown in the DOM. This are show as a List cos we set this up in <CartItems.js>
  return (
    <div className="cartItem">
      <h2> {name}</h2>
      <p>${price} /-</p>
      <p>x{quantity}</p>
      <article>Total ${total}</article>
      <button className="cart-actions" onClick={removeHandler}>
        -
      </button>
      <button className="cart-actions" onClick={addHandler}>
        +
      </button>
    </div>
  );



# 4. Show Cart functionability. Explanation: 53-55

1.  src/store/cart-slice.js: Create the reducer "setShowCart". In order to be able to click on the button amount and show the list once we have added at list one element and the list will disappear if we delete all items. (lin 45 -47).
        setShowCart(state) {
            state.showCart = !state.showCart; // allows to swith from true to false everytime we call this function. USeful to show the info in the DOM
        }

2.  src/components/Cart.js: Create the eventHanler attached to the button in order to show the list of added items.
    2.1 Grab the state of showCart:
      const quantity = useSelector(state => state.cart.totalQuantity);

    2.2 - Create the const "dispatch" and call "useDispatch".
    2.3 - onClick to the button:
    <h3 onClick={showCart}>Cart: {quantity} Items</h3>
    2.4 - Create the "showCart" function. (lin 10 -12).
      const showCart = () => {
    dispatch(cartActions.setShowCart());
  }

3.  src/components/Layout.js:
    3.1 - Get the "showCart" state (store):
    const showCart = useSelector(state => state.cart.showCart);
    3.2 - Conditional rendering with the && operator

            {showCart && <CartItems />}

# 5. Functionability to reduce and increse the amount in the layout Cart list. Explanation min 55 - 1:03 hr

5.1 src/store/cart-slice.js: Create reducer "removeFromCart". Just like add items. We check if the I'tem exist and then remove it completely only if the amoung is 1, if there is more than one, then just decrease the amount and total value.
        removeFromCart(state, action) {
            state.changed = true;
            const id = action.payload;

            const existingItem = state.itemsList.find((item) => item.id === id);
            if (existingItem.quantity === 1) {
                state.itemsList = state.itemsList.filter(item => item.id !== id)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price
            }
        },

5.2 src/components/CartItem.js:
5.2.1 - Create const "dispatch" and call "useDispatch"
const dispatch = useDispatch();

5.2.2 - Create eventHandlers to remove and add items:

      <button className="cart-actions" onClick={removeHandler}>
      <button className="cart-actions" onClick={addHandler}>

5.2.3 - Create "removeHandler" (lin 7 - 9)
  const removeHandler = () => {
    dispatch(cartActions.removeFromCart(id));
  };

5.2.4 -Create "addHandler" (lin 10 -18)
  const addHandler = () => {
    dispatch(
      cartActions.addToCart({
        id,
        name,
        price,
      })
    );
  };
N: Same method we use to add items to the cart. Checkout "src/components.Product.js".

# 6. Increase the amount of money (total value from the items in the cart) Explanation 1:04.

src/components/Layout.js

1. Create a variable equal to 0
   let total = 0;

2. Get "itemList" from the store (useSelector)
   const itemList = useSelector(state => state.cart.itemsList);

3. Increasing the amount using forEach high order array method:
   itemList.forEach(item => {
   total += item.totalPrice;
   })
