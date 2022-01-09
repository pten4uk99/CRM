const initialState = {
    hours: new Date().getHours(),
    minutes: new Date().getMinutes()
}


export default function CurrentData(state = initialState, action) {
    switch (action.type) {
        case "REFRESH_TIME":
            return {
                hours: new Date().getHours(),
                minutes: new Date().getMinutes()
            };
        default:
            return state;
    }
}