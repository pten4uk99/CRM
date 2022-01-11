import {combineReducers} from "redux";
import AddClientWindow from "./AddClientWindow"
import Master from "./Master";

export default combineReducers({
        Master,
        AddClientWindow
    }
)