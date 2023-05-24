// import redux from redux and store it in variable 
const redux = require('redux');
// call createStore method from redux and store it in variable name createStore 
const createStore = redux.createStore;

//Action type
const CAKE_ORDERED = 'CAKE_ORDERED';

//function that holds our action type 
function orderCake() {
    return {
        // type of action that performed by the user 
        type: CAKE_ORDERED,
        // number of cake that user want to buy 
        quantity: 1,
    }
}

//Our initial state where we can declare object and our initial state 
const initialState = {
    // first state value 
    numOfCakes: 10,
    // second state value 
    numOfCakesOrdered: 0,
}

const reducer = (state = initialState, action) => {  //Reducer two arguments one is previous state and action that happened in our application
    switch (action.type) {
        //if action type matched than we update our initial state value
        case CAKE_ORDERED:
            return {
                ...state, //here we can copy all state that available in our initialState than update only one property that match with our action type
                numOfCakes: state.numOfCakes - 1
            }
        //Otherwise return our state as it is
        default:
            return state
    }
}

/*------------------------------------REDUX STORE ---------------------------- */

// One Store for the entire application

/*-----------Responsibilities----------*/
// Holds application store
// Allows access to state via getState()
// Allows state to be updated via dispatch(action)
// Registers listeners via subscribe(listener )
// Handles unregistering of listeners via the function returned by subscribe listener 

// Now here we create our store 
const store = createStore(reducer);

console.log('Initial State', store.getState());
const unsubscribe = store.subscribe(() => console.log('updated state', store.getState()));

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

// console.log();
unsubscribe();