export const saveListUser = (payload) => {
    return {
        type: "SAVE_LIST_USER",
        payload: payload,
    };
};

export const setShowModal = (payload) => {
    return {
        type: "SHOW_MODAL",
        payload: payload,
    };
};

export const passAccountToAction = (payload) => {
    return {
        type: "PASS_ACCOUNT_TO_ACTION",
        payload: payload,
    };
};