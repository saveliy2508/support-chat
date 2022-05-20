import {combineReducers} from "redux";
import userReducer from "./userReducer";
import dataReducer from "./dataReducer";
import authErrorReducer from "./authErrorReducer";

const rootReducer = combineReducers({
    user: userReducer,
    data: dataReducer,
})

export default rootReducer;