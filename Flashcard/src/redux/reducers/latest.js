const initialState = {
	searchType: "subject",
	arrLearn: [],
	subjectFound: [],
	lessionFound: [],
	flashcardFound: [],
	quizId: "",
	timer: "",
	tags: [],
	selected: [],
};

const latestReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ACTIVE_SEARCH_LATEST": {
			return {
				...state,
				searchType: action.payload,
			};
		}
		case "SET_QUESTION_LEARN": {
			return {
				...state,
				arrLearn: action.payload,
			};
		}
		case "SAVE_SUBJECT_BY_SUBJECT": {
			return {
				...state,
				subjectFound: action.payload,
			};
		}
		case "SAVE_LESSION_BY_FLASHCARD": {
			return {
				...state,
				lessionFound: action.payload,
			};
		}
		case "SAVE_FLASHCARD_BY_QUESTION": {
			return {
				...state,
				flashcardFound: action.payload,
			};
		}
		case "SET_QUIZ_ID": {
			return {
				...state,
				quizId: action.payload,
			};
		}
		case "SET_TIME_FOR_QUIZ": {
			return {
				...state,
				timer: action.payload,
			};
		}
		case "SET_TAG_LIST": {
			return {
				...state,
				tags: action.payload,
			};
		}
		case "SET_TAG_SELECT": {
			return {
				...state,
				selected: action.payload,
			};
		}
		default:
			return state;
	}
};

export default latestReducer;
