import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { isLoggIn: false },
    reducers: {
        login(state) {
            state.isLoggIn = true;
        },
        logout(state) {
            state.isLoggIn = false;
        }
    }
})

export const authActions = authSlice.actions;
/*
This from above cold be also like this
export const {login, logout} = authSlice.actions;

N: By distrassing the function, we can call the function directly. Example in src/store/index.js


*/

export default authSlice;