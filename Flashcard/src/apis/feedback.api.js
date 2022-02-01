import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_GIFT_FEEDBACK_API;

const feedbackAPI = {
	sendFeedback: (params) => {
		const url = baseUrl + "/save";
		return axiosClient.post(url, { params });
	},
};

export default feedbackAPI;
