import rootReducers from "./reducer";
import thunk from "redux-thunk";
import {applyMiddleware, compose, createStore} from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

export default store;