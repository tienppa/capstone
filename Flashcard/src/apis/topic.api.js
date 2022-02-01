import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_TOPIC_API;

const topicAPI = {
	getAllTopic: () => {
		const url = baseUrl + "/all";
		return axiosClient.get(url);
	},

	getTopicByMe: () => {
		const url = baseUrl + "/find-by-email";
		return axiosClient.get(url, {});
	},

	addNewTopic: (params) => {
		const url = baseUrl + "/create";
		return axiosClient.post(url, { params });
	},

	removeTopicById: (params) => {
		const url = baseUrl + "/delete";
		return axiosClient.post(url, { params });
	},

	updateTopicById: (params) => {
		const url = baseUrl + "/delete";
		return axiosClient.post(url, { params });
	},
};

export default topicAPI;
