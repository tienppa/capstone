import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_SUBJECT_API;

const subjectAPI = {
	getInterestSubject: (params) => {
		const url = baseUrl + "/for-home-interest";
		return axiosClient.post(url, { params });
	},

	getSubjectByMe: () => {
		const url = baseUrl + "/subject-by-signin-mail";
		return axiosClient.get(url);
	},

	addSubjectByTopicId: (params) => {
		const url = baseUrl + "/create";
		return axiosClient.post(url, { params });
	},

	getSubjectByTopicId: (params) => {
		const url = baseUrl + "/create";
		return axiosClient.post(url, { params });
	},

	removeSubjectById: (params) => {
		const url = baseUrl + "/delete";
		return axiosClient.post(url, { params });
	},

	updateSubjectById: (params) => {
		const url = baseUrl + "/update";
		return axiosClient.put(url, { params });
	},
	increaseView: (params) => {
		const url = baseUrl + "/increase-view";
		return axiosClient.put(url, { params });
	},
	checkPublic: (params) => {
		const url = baseUrl + "/check-public-access";
		return axiosClient.post(url, { params });
	},
	saveRelation: (params) => {
		const url = baseUrl + "/save-relation";
		return axiosClient.post(url, { params });
	},
};

export default subjectAPI;
