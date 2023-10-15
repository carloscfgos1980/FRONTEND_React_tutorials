## Redux-Shopping-Cart_Nikhil-Thadani (I). Basic

https://www.youtube.com/watch?v=zrs7u6bdbUw

# Location in Mac:
/Users/carlosinfante/Desktop/coding-projects/winc-academy/frontend-course/MODULE9 - DEBUGGING and DOMAIN MODELING/REVIEW/redux/tutorials/1. Based/learning-react-nikhil_1

# Location in Github:
https://github.com/carloscfgos1980/React-Redux-Basic-Nikhil-tutorial

* This fisrt part of basic Redix has two ways:
1. Without Redux toolkit. The explanation ends at min 16. It is everything that is commented in app.js and src/store.index.js
2. Using redux toolkit. We can call the reducer function direct from the main app. Explanation starts at min 16

# Goals:
- Redux conceptual definition.
- Instalations
- Redux toolkit
- Reducers
- Dispatch
- Hook (useSelector). Access to the data in the store

# Concepts:
<Redux>: A complex manage tool, with a single store as CDS (Central Data Store)
<Reducers>: MAnage the state and return the newly updated state. There are two limitations:
1. It must be a synchronous function
2. We should not mutate the original state
<Actions>: They are part of the reducer function which is actually the parameter and the reducer function. They have 2 properties, type and payload property. The type has a unique identify in it and the payload property has the data in it.
<Dispatch>: It is used to send actions to update the data.
<Redux toolkit>: toolset for efficent Redux development. It simpliefied the process and allows us to mutate the state.


1. Redux basic with redux toolkit
# Steps:
1.1 Instalations:
npx create-react-app
npm install
npm install redux react-redux


1.2 Create store folder and index.js inside that store
1.3 src/store/index.js. Create basic configuration:
import { configureStore, createSlice } from '@reduxjs/toolkit';

const reducerFn = (state = { counter: 10 }, action) => {

}
const store = createStore(reducerFn)
counter:10 means that the initial value of <counter> is 10. It is the initial state.

1.4 src/index.js. Wrap the app with the store:
import { Provider } from 'react-redux';
import store from './store';

  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>

1.5. App.js. useSelector Hook to get access to the store:
  const counter = useSelector((state) => state.counter);

* Eevrything that is comment in src/store/index.js and src/app.js is the old way to implement dispatch and change the state in the store (using condiction as reducer).This is without <redux toolkit> which make is way easier. This explanation finish min 16 tutotial video:
// const reducerFn = (state = { counter: 10 }, action) => {
//     if (action.type === 'INC') {
//         return { counter: state.counter + 1 }
//     }
//     if (action.type === 'ADD') {
//         return { counter: state.counter + action.payload }
//     }

2. Using Redux toolkit:
2.1 Instalation:
npx-create-react-app my-app --template redux
* If we already have an app:
npm install @reduxjs/toolkit
npm start

2.2 src/store/index.js. Import configureStore, createSlice from reduxjs/toolkit:
import { configureStore, createSlice } from '@reduxjs/toolkit';

2.3 src/store/index.js. Create Slice. We name this one as 'counter' and provide and initial state (counter:0). And create 3 reducers for the actions we wan to do (increment, decrement, addBy)
const counterSlice = createSlice({
    name: 'counter',
    initialState: { counter: 0 },
    reducers: {
        increment(state, action) {
            state.counter++;
        },
        decrement(state, action) {
            state.counter--;
        },
        addby(state, action) {
            state.counter += action.payload;
        }
    }
})

2.4 src/store/index.js. Export the actions. This is imported in the main app in order to change the state:
export const actions = counterSlice.actions;

2.5 src/store/index.js. Export the store. This is all the data inside the store that we provide to the app. In a more complex app, this code goes in a different file:
const store = configureStore({
    reducer: counterSlice.reducer
})
export default store

2.6 App.js. Call the reducer functions from the app:
  const addBy = () => {
    //dispatch({type:'ADD', payload:10})
    dispatch(actions.addby(10))
  }
      <button onClick={addBy}>Add by 10</button>

## The End. This part of the explanation ends min 24