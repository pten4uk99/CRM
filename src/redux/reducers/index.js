import {combineReducers} from "redux";
import Header from "./Header/Header";
import Main from "./Main/index"

export default combineReducers({
        Header,
        Main: Main
    }
)