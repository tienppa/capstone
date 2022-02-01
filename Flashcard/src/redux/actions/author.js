export const refresh = (payload) => {
	return {
		type: "REFRESH_DATA",
		payload: payload,
	};
};
export const setSubjectIdForQuiz = (payload) => {
	return {
		type: "SET_SUBJECT_ID_FOR_QUIZ",
		payload: payload,
	};
};
export const setQuestionContent = (payload) => {
	return {
		type: "SET_CONTENT_QUESTION",
		payload: payload,
	};
};
export const setFlashcardContent = (payload) => {
	return {
		type: "SET_CONTENT_FLASHCARD",
		payload: payload,
	};
};
