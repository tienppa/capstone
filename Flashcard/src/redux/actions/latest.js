export const activeSearchType = (payload) => {
	return {
		type: "ACTIVE_SEARCH_LATEST",
		payload: payload,
	};
};
export const setQuestionLearn = (payload) => {
	return {
		type: "SET_QUESTION_LEARN",
		payload: payload,
	};
};
export const saveSubjectBySubject = (payload) => {
	return {
		type: "SAVE_SUBJECT_BY_SUBJECT",
		payload: payload,
	};
};
export const saveLessionByFlashcard = (payload) => {
	return {
		type: "SAVE_LESSION_BY_FLASHCARD",
		payload: payload,
	};
};
export const saveFlashcardByQuestion = (payload) => {
	return {
		type: "SAVE_FLASHCARD_BY_QUESTION",
		payload: payload,
	};
};
export const setQuizId = (payload) => {
	return {
		type: "SET_QUIZ_ID",
		payload: payload,
	};
};
export const setTimerQuiz = (payload) => {
	return {
		type: "SET_TIME_FOR_QUIZ",
		payload: payload,
	};
};
export const setTagList = (payload) => {
	return {
		type: "SET_TAG_LIST",
		payload: payload,
	};
};
export const setSelectedTag = (payload) => {
	return {
		type: "SET_TAG_SELECT",
		payload: payload,
	};
};
