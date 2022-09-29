export const SetClientErrorDetail = (detail) => {
    return {type: "SET_CLIENT_ERROR_DETAIL", detail: detail}
};
export const ClearClientErrorDetail = () => {
    return {type: "CLEAR_CLIENT_ERROR_DETAIL"}
};

