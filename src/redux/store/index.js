import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const initialState = {};

// const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))  
);

export default store;
