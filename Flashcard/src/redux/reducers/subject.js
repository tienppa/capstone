const initialState = {
	subjectList: {},
};

const subjectReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_SUGGEST_SUBJECT": {
			return {
				...state,
				subjectList: action.payload,
			};
		}
		default:
			return state;
	}
};

export default subjectReducer;
