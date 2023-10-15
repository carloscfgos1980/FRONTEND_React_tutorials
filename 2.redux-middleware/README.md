## React Redux Todo App Tutorial | Learn Redux with Redux Toolkit (part I)

From min 29 of tutorial video
https://www.youtube.com/watch?v=fiesH6WU63I

Location in Mac:
/Users/carlosinfante/Desktop/coding-projects/winc-academy/frontend-course/MODULE9 - DEBUGGING and DOMAIN MODELING/REVIEW/redux/tutorials/3. API/Redux_API-Todo-chrisblakely

Location in GitHub:
https://github.com/carloscfgos1980/React-Redux-Toolkit-Todo_app-API-Middleware

# Goals:
- Async Thunk. Using middleware. We sent an action to the API and return and object as payload that we use as a reducer to change the data.
- Local REST API. 
- POST. Forms
- PATCH
- DELETE

# 1. Create Local REST API min 29
* This file could be anywhere in the computer. It does not need to be inside the frontend app, it behaves like a backend app.
   1.1 - cd api
   1.2 - npm install
   1.3 - npm run server

- If it works we should get the following message:
  Server running on port 7000.
  We should check that works fine by using PostMAn or just check ('http://localhost:7000/todos') in google chrome.
  N: There are other methods to create a fake API. I prefer The-Net-Ninja's method.

\*\*\* Ojo. I got this error message. It is because the use an old version of node. To solve this we need to install npm again.
Error: Objects are not valid as a React child (found: object with keys {title}). If you meant to render a collection of children, use an array instead.

# 2. Fetch Data. min 31
2.1 - todoSlice.js. Import AsyncThunk:
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

2.2 todoSlice.js. Create the FETCH function to call the API "getTodosAsync". We use the GET method. (lin 3 -12)
export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        const response = await fetch('http://localhost:7000/todos');
        if (response.ok) {
            const todos = await response.json();
            return { todos } // This contains all the data and it will be the action.payload
        }
    }
);

2.3 - Create the extraReducers.
    extraReducers: {
        [getTodosAsync.fulfilled]: (state, action) => {
            return action.payload.todos; // This update the ste in the sotre


2.4 - src/components/TodoList.js: Display the fetched data.
2.4.1 - Import tha sync function
import { getTodosAsync } from '../redux/todoSlice';

2.4.2 Import useEffect:
import React, { useEffect } from 'react';

2.4.3 Dispatch the action
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTodosAsync())
	}, [dispatch])
* dispatch as dependency so it will update everytime that we dispatch an action

# 3. POST data in the API from the store. min 39
3.1 src/redux/todoSlice.js:  - Create the function to call the API "addTodoAsync". We use the GET method. (lin 14 -30)
export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async (payload) => {
        const resp = await fetch('http://localhost:7000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: payload.title }),
        });

        if (resp.ok) {
            const todo = await resp.json();
            return { todo }; This is the new item added 
        }
    }
);

3.2 - Create the reducer in order to POST the DATA (new todo-task):
    [addTodoAsync.fulfilled]: (state, action) => {
    state.push(action.payload.todo);
    },
* This will push the new item (todo) into the state (todos: array of ojects)
    N: Same method that with the reducer but simplier coz with the API we dont need to provide the id or the complete status. The API do that automatically for us.

3.3 - src/components/TodoForm.js: POST in the API from the App.
3.3.1 Inport the POST Async function:
import { addTodoAsync } from '../redux/todoSlice';
3.3.2 Create the function to fire in the form and place the async function inside it.
	const onSubmit = (event) => {
		event.preventDefault();
		console.log('user entered: ' + value);
		dispatch(addTodoAsync({
			title: value,
		}));
		setValue('');
	};

# 4.  PATCH data (change the state) in the API from the store. min 44
4.1 src/redux/todoSlice.js: - Create the function to call the API "toggleCompleteAsync". We use the PATCH method. (lin 32 -48):
export const toggleCompleteAsync = createAsyncThunk(
    'todos/completeTodoAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: payload.completed }),
        });

        if (resp.ok) {
            const todo = await resp.json();
            return { todo };
        }
    }
);
4.2 - Create the reducer in order to PATCH the DATA (change the state):
            [toggleCompleteAsync.fulfilled]: (state, action) => {
                const index = state.findIndex(
                    (todo) => todo.id === action.payload.todo.id
                );
                state[index].completed = action.payload.todo.completed;
            },
N: Same method that with the reducer, just we have to add extra index(todo) since we are getting the return object sent by the REST API action (PATC)

4.3 src/components/TodoItem.js: PATCH in the API from the App.
4.3.1 - Call the dispatch method.
4.3.2 - Call the useEffect method.
4.3.3 - Replace "addTodos" with "addTodoAsync". Everythin should look like follow:

    const dispatch = useDispatch();
    const handleCompleteClick = () => {
    	dispatch(toggleCompleteAsync({
    		id,
    		completed: !completed
    	}));
    	console.log("changed state", title)
    }

# 5.  src/redux/todoSlice.js: DELETE data in the API from the store. 
* This method I had to learn myself!
5.1 - Create the function to call the API "deleteTodoAsync". We use the GET method. (lin 50 - 61).
            [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.todo.id
            );
            state[index].completed = action.payload.todo.completed;
        },
5.2 - Create the reducer in order to DELETE the DATA:

         [deleteTodoAsync.fulfilled]: (state, action) => {
             return state.filter((todo) => todo.id !== action.payload.id);
         },

 * Same method that with the reducer.

5.3 - src/components/TodoItem.js: DELETE in the API from the App.
    N: We already imported dispatch and useEffect for this file.
    Replace "deleteTodo" with "deleteTodoAsync". Everythin should look like follow:

    const handleDeleteClick = () => {
    console.log("clicked!")
    dispatch(deleteTodoAsync({ id }));
    }

# FIN!

 NOTE: This method will probably soon be decapricated so I will not learn it by heart. The dynamic is to create a function to communicate with the API, the an extrareducer that will have the same logic of the correspondent reducer and then update the function name when we dispatch an action.
All this when we are transforming the app with no API to app with API.
Once we have built all the functionability with API, we can delete or comment the reducers coz the are not longer used.
If we create the function directly to work with an API then we have to write all the codes from scratch.
