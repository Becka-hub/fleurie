import { createStore } from "redux";
import rootReducers from "./rootReducers";
import { composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
const store=createStore(rootReducers,composeWithDevTools(applyMiddleware(thunk)));
export default store;