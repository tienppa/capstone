import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_LESSION_API;

const lessionAPI = {
	getLessionBySubId: (params) => {
		const url = baseUrl + "/get-lession-by-subjectId";
		return axiosClient.post(url, { params });
	},

	getPublicLessionBySubId: (params) => {
		const url = baseUrl + "/public-lession-by-subjectid";
		return axiosClient.post(url, { params });
	},

	getLessionByMe: () => {
		const url = baseUrl + "/get-lession-by-me";
		return axiosClient.get(url, {});
	},

	createLessionBySubId: (params) => {
		const url = baseUrl + "/create-lession-by-subjectid";
		return axiosClient.post(url, { params });
	},

	updateLessionById: (params) => {
		const url = baseUrl + "/update-lession-by-id";
		return axiosClient.put(url, { params });
	},

	getLessionByAccountId: (params) => {
		const url = baseUrl + "/get-lession-by-accountid";
		return axiosClient.post(url, { params });
	},

	getLessionByLessionId: (params) => {
		const url = baseUrl + "/get-lession-by-lessionid";
		return axiosClient.post(url, { params });
	},

	getAllLession: (params) => {
		const url = baseUrl + "/get-all-lession";
		return axiosClient.post(url, { params });
	},

	removeLessionById: (params) => {
		const url = baseUrl + "/delete";
		return axiosClient.post(url, { params });
	},
	increaseView: (params) => {
		const url = baseUrl + "/increase-view";
		return axiosClient.put(url, { params });
	},
};

export default lessionAPI;
