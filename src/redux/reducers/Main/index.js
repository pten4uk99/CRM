import {combineReducers} from "redux";
import masters from "./masters";
import addClientWindow from "./addClientWindow";

export default combineReducers({
        masters,
        addClientWindow
    }
)