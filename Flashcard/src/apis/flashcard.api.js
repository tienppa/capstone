import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_FLASHCARD_API;

const flashcardAPI = {
	getFlashcardByLessionId: (params) => {
		const url = baseUrl + "/get-flashcard-by-lessionid";
		return axiosClient.post(url, { params });
	},

	getFlashcardByMe: () => {
		const url = baseUrl + "/get-flashcard-by-me";
		return axiosClient.get(url, {});
	},

	removeFlashcardById: (params) => {
		const url = baseUrl + "/delete";
		return axiosClient.post(url, { params });
	},

	addFlashcardByLessionId: (params) => {
		const url = baseUrl + "/create-flashcard";
		return axiosClient.post(url, { params });
	},

	updateFlashcardByFlashcardId: (params) => {
		const url = baseUrl + "/update-flashcard-by-flashcardid";
		return axiosClient.put(url, { params });
	},
	getFlashcardDetail: (params) => {
		const url = baseUrl + "/get-flashcard-by-flashcardid";
		return axiosClient.post(url, { params });
	},
	increaseView: (params) => {
		const url = baseUrl + "/increase-view";
		return axiosClient.put(url, { params });
	},
};

export default flashcardAPI;
