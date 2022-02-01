
const initialState = {
    listUser: {},
    isShowModal: false,
    accountToAction: null,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_LIST_USER": {
            return {
                ...state,
                listUser: action.payload,
            };
        }
        case "SHOW_MODAL": {
            return {
                ...state,
                isShowModal: action.payload
            }
        }
        case "PASS_ACCOUNT_TO_ACTION": {
            return {
                ...state,
                accountToAction: action.payload
            }
        }
        default:
            return state;
    }
};

export default adminReducer;
