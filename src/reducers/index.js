import { combineReducers } from "redux";
import navReducer from "./navReducer";
import userInfoReducer from "./userInfoReducer";
const allReducers = combineReducers({
    navReducer : navReducer,
    userInfoReducer : userInfoReducer,
})

export default allReducers;