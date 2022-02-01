const initialState = {
	refresh: 0,
	subjectId: "",
	flashContent: "",
	quesContent: "",
};

const authorReducer = (state = initialState, action) => {
	switch (action.type) {
		case "REFRESH_DATA": {
			return {
				...state,
				refresh: ++state.refresh,
			};
		}
		case "SET_SUBJECT_ID_FOR_QUIZ": {
			return {
				...state,
				subjectId: action.payload,
			};
		}
		case "SET_CONTENT_QUESTION": {
			return {
				...state,
				quesContent: action.payload,
			};
		}
		case "SET_CONTENT_FLASHCARD": {
			return {
				...state,
				flashContent: action.payload,
			};
		}
		default:
			return state;
	}
};

export default authorReducer;
