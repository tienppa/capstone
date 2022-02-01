import axiosClient from "./axiosClient";

const baseUrl = "http://localhost:9191/subject";
const baseF = "http://localhost:9191/lession";
const baseQ = "http://localhost:9191/flashcard";

const searchAPI = {
	searchSubject: (params) => {
		const url = baseUrl + "/find-name-des";
		return axiosClient.post(url, { params });
	},
	searchSubjectByLession: (params) => {
		const url = baseUrl + "/find-name-des-lession";
		return axiosClient.post(url, { params });
	},
	searchFlashcardReturnLession: (params) => {
		const url = baseF + "/find-by-ft-flashacrd";
		return axiosClient.post(url, { params });
	},
	searchQuestionReturnFlashcard: (params) => {
		const url = baseQ + "/find-by-ft-question";
		return axiosClient.post(url, { params });
	},
};

export default searchAPI;
