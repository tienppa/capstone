import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_DONOR_API;
const typeUrl = process.env.REACT_APP_DONOR_SERVICE_TYPE;

const donorAPI = {
	getServices: () => {
		const url = baseUrl + "/all-by-me";
		return axiosClient.get(url);
	},
	updateService: (params) => {
		const url = baseUrl + "/update";
		return axiosClient.post(url, { params });
	},
	getServiceType: () => {
		const url = typeUrl;
		return axiosClient.get(url);
	},
	addService: (params) => {
		const url = baseUrl + "/create";
		return axiosClient.post(url, { params });
	},
	deleteService: (params) => {
		const url = baseUrl + "/delete";
		return axiosClient.post(url, { params });
	},
};

export default donorAPI;
