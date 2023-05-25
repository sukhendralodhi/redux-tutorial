// import redux from redux and store it in variable 
const redux = require('redux');
// call createStore method from redux and store it in variable name createStore 
const createStore = redux.createStore;

// import from index for binding action creater 
const bindActionCreators = redux.bindActionCreators;

//Action type for cake
// Another action type 
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCK = 'CAKE_RESTOCK';
//Action type for ice-cream
const ICE_CREAM_ORDERED = 'ICE_CREAM_ORDERED';
const ICE_CREAM_RESTOCK = 'ICE_CREAM_RESTOCK';


/*this function belong to cake*/

//function that holds our action type 
function orderCake() {
    return {
        // type of action that performed by the user 
        type: CAKE_ORDERED,
        // number of cake that user want to buy 
        payload: 1,
    }
}

// function that restore our initialState if action type match 
function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCK,
        // payload is just name you called it anything but redux-toolkit used payload so we are called it payload for matching
        payload: qty,
    }
}

/*this function belong to cake*/

/*this function belong to ice-cream*/
// for order ICE_CREAM_ORDERED
function orderIceCream() {
    return {
        type: ICE_CREAM_ORDERED,
        payload: 1
    }
}

// for restockIceCream
function restockIceCream(qty = 1) {
    return {
        type: ICE_CREAM_RESTOCK,
        payload: qty
    }
}
/*this function belong to ice-cream*/

//Our initial state where we can declare object and our initial state 
const initialState = {
    // first state value 
    numOfCakes: 10,
    // second state value 
    numOfCakesOrdered: 0,
    // third state value
    numOfIceCream: 10,
    // fourth state value
    numOfIceCreamOrdered: 0,
}

const reducer = (state = initialState, action) => {  //Reducer two arguments one is previous state and action that happened in our application
    switch (action.type) {
        //if action type matched than we update our initial state value
        case CAKE_ORDERED:
            return {
                ...state, //here we can copy all state that available in our initialState than update only one property that match with our action type
                numOfCakes: state.numOfCakes - 1
            }
        // if action match be can restore our initialState 
        case CAKE_RESTOCK:
            return {
                ...state, //copy our all state and change only that match action type
                numOfCakes: state.numOfCakes + action.payload
            }
        //if action type matched than we update our initial state value
        case ICE_CREAM_ORDERED:
            return {
                ...state, //copy our all state and change only that match action type
                numOfIceCream: state.numOfIceCream - 1
            }
        // if action match be can restore our initialState 
        case ICE_CREAM_RESTOCK:
            return {
                ...state, //copy our all state and change only that match action type
                numOfIceCream: state.numOfIceCream + action.payload
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

// dispatch an action to the store for ordered cake
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// dispatch an action to the store for restore stock
// store.dispatch(restockCake(3));

const action = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch);
// action.orderCake();
// action.orderCake();
// action.restockCake();

// console.log();
// unsubscribe();
action.orderIceCream();
action.restockIceCream();