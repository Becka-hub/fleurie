import FleurieReducer from './reducer/FleurieReducer';
import PanierReducer from './reducer/PanierReducer';
import AuthReducer from './reducer/AuthReducer';
import { combineReducers } from "redux";
const rootReducers = combineReducers({ fleurie: FleurieReducer,panier:PanierReducer,user:AuthReducer});
export default rootReducers;