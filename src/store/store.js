import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import thunk from "redux-thunk";
import { debounce } from "debounce";

const KEY = "redux";
const loadState = () => {
  try {
    const serialState = sessionStorage.getItem(KEY);
    if (serialState === null) {
      return undefined;
    }
    return JSON.parse(serialState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serialState = JSON.stringify(state);
    sessionStorage.setItem(KEY, serialState);
  } catch(err) {
    console.log(err);
  }
};


let initialState = {
  user: undefined
};

function reducer(state = initialState, action) {
  switch (action.type){
    case 'SET_USER':
      return {...state, user: action.payload};
    case 'DELETE_USER':
      return  {...state, user: undefined};
    default:
      return state;
  }
}
const persistedState = loadState();

let store = createStore(reducer, persistedState, applyMiddleware(thunk));

store.subscribe(
    debounce(() => {
      saveState(store.getState());
    }, 800)
);
export default store;