import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_ADMIN_API;

const adminAPI = {
	getAllStudentDonor: () => {
		const url = baseUrl + "/all";
		return axiosClient.get(url);
	},
	banAccount: (params) => {
		const url = baseUrl + "/ban-account";
		return axiosClient.post(url, { params });
	},
};

export default adminAPI;
