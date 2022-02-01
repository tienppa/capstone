import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_GIFT_API;

const giftAPI = {
	getGifts: (params) => {
		const url = baseUrl + "/available-service";
		return axiosClient.get(url, { params });
	},

	saveGiftLearner: (params) => {
		const url = baseUrl + "/save-relation";
		return axiosClient.post(url, { params });
	},

	getGiftReceive: () => {
		const url = baseUrl + "/history";
		return axiosClient.get(url);
	},
};

export default giftAPI;
