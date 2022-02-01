import axiosClient from "./axiosClient";

const checkAcceptAPI = {
	checkAcceptLession: (params) => {
		const url = "http://localhost:9191/access-lession/check-permission";
		return axiosClient.post(url, { params });
	},

	checkAcceptSubject: (params) => {
		const url = "http://localhost:9191/access-subject/check-permission";
		return axiosClient.post(url, { params });
	},
};

export default checkAcceptAPI;
