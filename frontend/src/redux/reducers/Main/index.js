import {combineReducers} from "redux";
import masters from "./masters_reducer";
import addClientWindow from "./addClientWindow_reducer";
import clients from "./clients_reducer";
import clientError from "../../../components/Utils/redux/clientError/clientErrorReducer";
import serverError from "../../../components/Utils/redux/serverError/serverErrorReducer";

export default combineReducers({
        masters: masters,
        addClientWindow: addClientWindow,
        clients: clients,
        clientError: clientError,
        serverError: serverError,
    }
)