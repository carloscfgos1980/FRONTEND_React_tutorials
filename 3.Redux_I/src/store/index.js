import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth-slice';
import cartSlice from './cart-slice';
import uiSlice from './ui-slice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        /* If we distress the export actions in the configureStore (auth-slice). We can simply do as follow:
        auth: authSlice
        */
        cart: cartSlice.reducer,
        ui: uiSlice.reducer,
    }
});

export default store;