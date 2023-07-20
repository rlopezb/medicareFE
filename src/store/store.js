import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import thunk from "redux-thunk";

let initialState = {
  user: {}
};

function reducer(state = initialState, action) {
  switch (action.type){
    case 'SET_USER':
      return {...state, user: action.payload};
    default:
      return state;
  }
}

let store = createStore(reducer, applyMiddleware(thunk));

export default store;