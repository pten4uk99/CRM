export const SetServerErrorDetail = (detail) => {
    return {type: "SET_SERVER_ERROR_DETAIL", detail: detail}
};
export const ClearServerErrorDetail = () => {
    return {type: "CLEAR_SERVER_ERROR_DETAIL"}
};
