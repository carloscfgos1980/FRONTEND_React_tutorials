import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './store/index'

function App() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const increment = () => {
    //dispatch({type:'INC'})
    dispatch(actions.increment())
  }

  const decrement = () => {
    //dispatch({type:'INC'})
    dispatch(actions.decrement())
  }

  const addBy = () => {
    //dispatch({type:'ADD', payload:10})
    dispatch(actions.addby(10))
  }
  return (
    <div>
      <h1>Counter App</h1>
      <h2>{counter}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={addBy}>Add by 10</button>
    </div>
  );
}

export default App;