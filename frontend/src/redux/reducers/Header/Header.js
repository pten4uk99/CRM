import {combineReducers} from "redux";
import menu from "./menu";
import CurrentData from "./CurrentData";

export default combineReducers({
        menu,
        CurrentData
    }
)