const redux = require('redux');
// initialState
const initialState = {
    name: "Sanju",
    address: {
        street: '123 main Vishnupuri',
        city: 'Indore',
        state: 'UK'
    },
}

// action type 
const STREET_UPDATED = 'STREET_UPDATED';
const CITY_UPDATED = 'CITY_UPDATED';

// function that update our state if type match 
// update street function 
const updateStreet = (street) => { //here street is a parameter of our function that is called payload in our reducer
    return {
        type: STREET_UPDATED,
        payload: street,
    }
}

// update city function 
const updateCity = (city) => { //here city is a parameter of our function that is called payload in our reducer
    return {
        type: 'CITY_UPDATED',
        payload: city,
    }
}

// define the reducer 
const reducer = (state = initialState, action) => {
    switch (action.type) {
        // case 1 if that is match than be update our initial state value
        case STREET_UPDATED:
            return {
                ...state, //copy all state
                address: {
                    ...state.address, //copy all state that is available our address obj
                    street: action.payload //that update our street value
                }
            }
        case CITY_UPDATED:
            return {
                ...state, //copy all state
                address: {
                    ...state.address, //copy all value that available inside address object
                    city: action.payload //that update our city value
                }
            }
        default: {
            return state  //if case not match than return our initial state
        }
    }
}

// creating our redux store 
const store = redux.createStore(reducer); //create store using createStore method that is provided by the redux
console.log('Initial State:', store.getState()); //getState is method for getting state form our store


// that is provided by the redux and it accept a object as a parameter
const unsubscribe = store.subscribe(() => {
    console.log('Updated State', store.getState()); //that console show all the changes that occur in our state
});

store.dispatch(updateStreet('456 main Gwalior'));
store.dispatch(updateCity('California'));
unsubscribe();