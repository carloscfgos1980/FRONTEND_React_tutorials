## React Redux Todo App Tutorial | Learn Redux with Redux Toolkit (part I)

Till min 29 of tutorial video
https://www.youtube.com/watch?v=fiesH6WU63I

Location in Mac:
/Users/carlosinfante/Desktop/coding-projects/winc-academy/frontend-course/MODULE9 - DEBUGGING and DOMAIN MODELING/REVIEW/redux/tutorials/2. NoAPI/Redux_NoAPI-todo-chrisblakely

Location in GitHub:
https://github.com/carloscfgos1980/React-Redux-Toolkit-Todo_app-NoAPI

# Goals:
- Set up store
- Dispatch data from the input field to the store
- Retrieve data from the store
- update the state of completed todo. Using find method
- Delete Todo
- Show the amount of completed todo
- CSS. bootstrap. Using condictional rendering to use a different style if the task is completed. TodoItem:
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>

# STEPS:
# 1. Set up the Store. Till min 12
1.1 Inside folder "src": Create another folder named "redux"

1.2 in the terminal:
   npm install redux react-redux
   npm install @reduxjs/toolkit

1.3 Inside "redux": Create a file "store.js"

1.4 Inside "store.js":
   import { configureStore } from '@reduxjs/toolkit';
   import todoReducer from './todoSlice'

export default configureStore({
reducer: {
todos: todoReducer,
}
})

1.5  Inside "redux": Create a file "todoSlice.js"
    1.5.1
    import { createSlice } from '@reduxjs/toolkit';

    1.5.2 Creatte the slice function which requires (name, initialState, reducers). The action executed by the event handler are written inside the reducers.

        const todoSlice = createSlice({
        name: 'todos',
        initialState: [
        { id: 1, title: 'todo 1', completed: false },
        { id: 2, title: 'todo 2', completed: false },
        { id: 3, title: 'todo 3', completed: true },
        ],
        reducers: {
        addTodo: (state, action) => {
        },
        )};

    1.5.3  Add reducer for adding input. src/redux/todoSlice.js:
        (lin 11 - 18)
        addTodo: (state, action) => {
        const newTodo = {
        id: Date.now(),//This create unique ids based in the current time
        title: action.payload.title,
        completed: false
        };
        state.push(newTodo);
        },

    1.5.4 Export the action:
        export const { addTodo } = todoSlice.actions;

    1.5.5 Expor the reducer to the store
            export default todoSlice.reducer;


# 2. Send the data to the store from the form
2.1  eventHandler to add new items to the list. src/AddTodoForm.js
    8.1 Import useDispatch and the addTodo(this is the function to add the items):
    import { useDispatch } from 'react-redux';
    import { addTodo } from '../redux/todoSlice';

2.2 Call the dispatch function:
const dispatch = useDispatch();

2.3 Create the submit function to attach to the button:
	const onSubmit = (event) => {
		event.preventDefault();
		console.log('user entered: ' + value);
		dispatch(addTodo({
			title: value,
		}));
		setValue(''); // This set the value back to empty strin in the input fill of the form
	};
2.4 Add the eventListener to the button:

<form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>

# 3. Retrieve data from the store to show as a list. Explanation min 16 - 19
3.1 TodoList.js. Store the data in a variable:
	const todos = useSelector(state => state.todos);

3.2 TodoList.js Return <ul> and inside this <ul> map thru the array of data (todos) and pass the data to the component that actually show the data(TodoItem)
    		<ul className='list-group'>
			{todos.map((todo) => (
				<TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
			))}
		</ul>

# 4. Mark a Todo as completed. min 19 - 24
4.1 src/redux/todoSlice.js Add reducer(toggleCompleted) to change the state completed todo. Find method used:
        toggleCompleted: (state, action) => {
            const index = state.findIndex(
                todo => todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed;
        },
   9.2 Add the "toggleCompleted" to the the distressed exported actions:
   export const { addTodo, toggleCompleted } = todoSlice.actions;

4.2 TodoItem.js. Add eventHandler to change the state. src/TodoItems.js:
4.2.1 - Create the function for the eventhandler(lin 8 - 14):
	const dispatch = useDispatch();

	const handleCompleteClick = () => {
		dispatch(toggleCompleted({
			id,
			completed: !completed // passing the opposive value to the store as a payload
		}));
	}

4.2.2 - Add the evendHandler to the input (lin 28)
    onChange={handleCompleteClick}>

# 5. Delete Todo
5.1 redux/todoSlice.js. Reducer to delete(deleteTodo) selected item. src/redux/todoSlice.js:
        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload.id);
        }

5.2 redux/todoSlice.js. Add the "deleteTodo" to the the distressed exported actions:
    export const { addTodo, toggleCompleted, deleteTodo } = todoSlice.actions;

5.3 TodoItem.js. Add eventHandler to delete items.
5.3.1 Import the action:
import { deleteTodo, toggleCompleted } from '../redux/todoSlice';

5.3.2 Create the function:
	const handleDeleteClick = () => {
		console.log("clicked!")
		dispatch(deleteTodo({ id }));
	}

5.3.3 Add the event to the button:
<button onClick={handleDeleteClick} className='btn btn-danger'>Delete</button>

# 6. Sho the amount of completed Items. min 26
6.1 TodoCompleted.js Import useSelector 
import { useSelector } from 'react-redux';

6.2 TodoCompleted.js. Get the data from the store and filter the completed todo. 
* I usually do this in two steps. First storage all the data and then filter. In this case it's all done in a single step.
	const completeTodos = useSelector(state =>
		state.todos.filter(todo => todo.completed === true)
	);
6.3 TodoCompleted.js. Return the value (amount of completed todos):
	return <h4 className='mt-3'>Total Complete Items: {completeTodos.length}</h4>;
{completeTodos.length}. Method to calculate the amount of item (objects) inside the array

