import { createSlice } from '@reduxjs/toolkit';
//import { useSelector } from 'react-redux';
//import { uiActions } from './ui-slice';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false,
        changed: false,
    },
    reducers: {
        replaceData(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.itemsList = action.payload.itemsList;
        },
        addToCart(state, action) {
            state.changed = true;
            const newItem = action.payload;
            // This was very smart so  we can just use newItem instead of action.payload which is not very eyedfriendly

            // To check if the item is already available
            const existingItem = state.itemsList.find((item) => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            } else {
                state.itemsList.push({
                    name: newItem.name,
                    id: newItem.id,
                    quantity: 1,
                    totalPrice: newItem.price,
                    price: newItem.price
                });
                state.totalQuantity++; // increase the total quantity
            }
        },
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
        setShowCart(state) {
            state.showCart = !state.showCart; // allows to swith from true to false everytime we call this function. USeful to show the info in the DOM
        }
    }
});


export const cartActions = cartSlice.actions;

export default cartSlice;