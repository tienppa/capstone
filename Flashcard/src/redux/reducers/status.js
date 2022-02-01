const initialState = {
	isShowModal: false,
	isShowDrawer: false,
	isShowModalUpdate: false,
	typeRadioLatest: "suggest",
	isCheckAllQuestion: false,
};

const statusReducer = (state = initialState, action) => {
	switch (action.type) {
		case "CHANGE_MODAL_VISIBLE": {
			return {
				...state,
				isShowModal: action.payload,
			};
		}
		case "CHANGE_DRAWER_VISIBLE": {
			return {
				...state,
				isShowDrawer: action.payload,
			};
		}
		case "CHANGE_MODAL_UPDATE_VISIBLE": {
			return {
				...state,
				isShowModalUpdate: action.payload,
			};
		}
		case "CHANGE_TYPE_RADIO_LATEST": {
			return {
				...state,
				typeRadioLatest: action.payload,
			};
		}
		case "CHANGE_CHECK_ALL": {
			return {
				...state,
				isCheckAllQuestion: action.payload,
			};
		}
		default:
			return state;
	}
};

export default statusReducer;
