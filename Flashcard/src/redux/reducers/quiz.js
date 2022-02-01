const initialState = {
	quizId: "",
	quizInfo: [],
	quiz: [],
	review: [],
};

const quizReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SAVE_QUIZ_ID": {
			return {
				...state,
				quizId: action.payload,
			};
		}
		case "SAVE_QUIZ_INFO": {
			return {
				...state,
				quizInfo: action.payload,
			};
		}
		case "SAVE_QUIZ_CONTENT": {
			return {
				...state,
				quiz: action.payload,
			};
		}
		case "SAVE_QUIZ_REVIEW": {
			return {
				...state,
				review: action.payload,
			};
		}
		default:
			return state;
	}
};

export default quizReducer;
