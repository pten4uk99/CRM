import {combineReducers} from "redux";
import masters from "./masters_reducer";
import addClientWindow from "./addClientWindow_reducer";
import clients from "./clients_reducer";

export default combineReducers({
        masters: masters,
        addClientWindow: addClientWindow,
        clients: clients
    }
)