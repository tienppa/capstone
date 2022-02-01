const initialState = {
	isUpdate: false,
	isAdd: false,
	isAddAds: false,
	isUpdateAds: false,
};

const donorReducer = (state = initialState, action) => {
	switch (action.type) {
		case "IS_SHOW_UPDATE": {
			return {
				...state,
				isUpdate: action.payload,
			};
		}
		case "IS_SHOW_ADD": {
			return {
				...state,
				isAdd: action.payload,
			};
		}
		case "IS_SHOW_ADS_ADD": {
			return {
				...state,
				isAddAds: action.payload,
			};
		}
		case "IS_SHOW_ADS_UPDATE": {
			return {
				...state,
				isUpdateAds: action.payload,
			};
		}

		default:
			return state;
	}
};

export default donorReducer;
