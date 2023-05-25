// State
// state = {
//     loading: true,
//     data: [],
//     error: ``
// }

// loading - display a loading spinner in your component
// data - List of users
// error - Display error to the user

// Reducers : ->
// case : FETCH_USERS_REQUESTED
// loading: true

// case : FETCH_USERS_SUCCEEDED
// loading: false
// user: data(from API)

// case : FETCH_USERS_FAILED
// loading: false
// error: show error(form API)


const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
    loading: false,
    users: [],
    error: '',
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

// action function 1

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED
    }
}

// action function 2
const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
}

// action function 3
const fetchUsersFailed = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error,
    }
}

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                // response.data is the users 
                const users = response.data.map((user) => user.id);
                dispatch(fetchUserSuccess(users));
            }).catch((error) => {
                // error.message is the error message 
                dispatch(fetchUsersFailed(error.message));
            })
    }
}

// reducer 
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }

        case FETCH_USERS_SUCCEEDED:
            return {
                loading: false,
                users: action.payload,
                error: '',
            }
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }

        // default:
        //     return {
        //         state
        //     }
    }
}


// create store 
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
// console.log(store.getState());
store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(fetchUsers());


// ASYNC ACTION CREATORS

// requirement ->
// axios -> for api call (Request to an API end point)
// redux-thunk -> Define async action creators
// middleware

// COMMAND:-> npm install axios redux-thunk