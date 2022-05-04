import {combineReducers} from "redux";
import Header from "./Header/Header";
import Main from "./Main/index"
import calendar from "../../components/Header/Calendar/redux/reducers/calendar"

export default combineReducers({
        Header,
        calendar,
        Main: Main
    }
)