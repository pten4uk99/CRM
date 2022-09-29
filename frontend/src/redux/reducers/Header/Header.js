import {combineReducers} from "redux";
import menu from "./menu";
import CurrentData from "./CurrentData";
import modalWindow from "../../../components/Utils/redux/modalWindow/modalWindowReducer";

export default combineReducers({
        menu,
        CurrentData,
        modalWindow
    }
)