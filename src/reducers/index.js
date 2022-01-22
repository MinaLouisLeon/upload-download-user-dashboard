import { combineReducers } from "redux";
import navReducer from "./navReducer";
import userInfoReducer from "./userInfoReducer";
import allUsersDataReducer from "./allUsersDataReducer";
import uploadDataReducer from "./uploadDataReducer";
const allReducers = combineReducers({
    navReducer : navReducer,
    userInfoReducer : userInfoReducer,
    allUsersDataReducer : allUsersDataReducer,
    uploadDataReducer : uploadDataReducer,
})

export default allReducers;