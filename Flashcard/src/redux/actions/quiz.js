export const setQuizId = (payload) => {
	return {
		type: "SAVE_QUIZ_ID",
		payload: payload,
	};
};
export const setQuizInfo = (payload) => {
	return {
		type: "SAVE_QUIZ_INFO",
		payload: payload,
	};
};
export const setQuizContent = (payload) => {
	return {
		type: "SAVE_QUIZ_CONTENT",
		payload: payload,
	};
};
export const setQuizReview = (payload) => {
	return {
		type: "SAVE_QUIZ_REVIEW",
		payload: payload,
	};
};
