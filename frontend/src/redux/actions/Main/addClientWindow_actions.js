import {act} from "react-dom/test-utils";

export const SetClientInfoActive = (active) => {
    return {type: "SET_ADD_CLIENT_WINDOW_CLIENT_INFO_ACTIVE", payload: active}
}
export const SetChosenClientId = (clientId) => {
    return {type: "SET_ADD_CLIENT_WINDOW_CHOSEN_CLIENT_ID", payload: clientId}
}
export const SetAddClientWindowActive = (active) => {
    return {type: "SET_ADD_CLIENT_WINDOW_ACTIVE", payload: active}
}
export const SetChosenDuration = (duration) => {
    return {type: "SET_CHOSEN_DURATION", payload: duration}
}
export const SetDefaultTimeStart = (hour, minutes) => {
    return {type: "SET_ADD_CLIENT_WINDOW_DEFAULT_TIME_START", payload: {hour: hour, minutes: minutes}}
}
export const SetDefaultMaster = (pk, name, lastName) => {
    return {type: "SET_ADD_CLIENT_WINDOW_DEFAULT_MASTER", pk: pk, name: name, lastName: lastName}
}
export const SetTableItemId = (tableItemId) => {
    return {type: "SET_ADD_CLIENT_WINDOW_TABLE_ITEM", payload: {tableItemId: tableItemId}}
}
