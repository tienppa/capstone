import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_QUIZ_API;

const quizAPI = {
	addQuiz: (params) => {
		const url = baseUrl + "/create";
		return axiosClient.post(url, { params });
	},
	getQuizBySubjectId: (params) => {
		const url = baseUrl + "/get-by-subjectId";
		return axiosClient.post(url, { params });
	},
	viewQuizDetail: (params) => {
		const url = baseUrl + "/questions-by-quiztestid";
		return axiosClient.post(url, { params });
	},
	getQuizToTake: (params) => {
		const url = baseUrl + "/take-quiz-questions";
		return axiosClient.post(url, { params });
	},

	submitQuiz: (params) => {
		const url = "http://localhost:9191/test/submit";
		return axiosClient.post(url, { params });
	},
	reviewDetail: (params) => {
		const url = "http://localhost:9191/test/get-by-id";
		return axiosClient.post(url, { params });
	},
	getHistory: (params) => {
		const url = "http://localhost:9191/test/get-by-me";
		return axiosClient.get(url);
	},
};

export default quizAPI;
