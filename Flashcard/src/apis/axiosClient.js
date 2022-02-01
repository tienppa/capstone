import axios from "axios";
import queryString from "querystring";
import history from "router/history";

const axiosClient = axios.create({
	headers: {
		"content-type": "application/json",
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
	(config) => {
		const token = localStorage.accessToken;
		if (token) {
			config.headers["Authorization"] = "Bearer " + token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosClient.interceptors.response.use(
	(res) => {
		return res.data;
	},
	async (err) => {
		throw err;
		// const originalConfig = err.config;
		// const urlLogin = "http://localhost:9195/account/login";
		// const urlRefresh = "http://localhost:9195/account/token";
		// return;
		// if (originalConfig.url !== urlLogin && err.response) {
		// 	if (err.response.status === 403 && !originalConfig._retry) {
		// 		originalConfig._retry = true;
		// 		try {
		// 			const rs = await axiosClient.post(urlRefresh, {
		// 				refreshToken: localStorage.refreshToken,
		// 			});
		// 			console.log(rs);
		// 			// const { accessToken } = rs.data;
		// 			// localStorage.setItem("accessToken", accessToken);
		// 			return axiosClient(originalConfig);
		// 		} catch (_error) {
		// 			return Promise.reject(_error);
		// 		}
		// 	}
		// }
		// return Promise.reject(err);
	}
);

const clear = () => {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("refreshToken");
	localStorage.removeItem("persist:root");
};

export default axiosClient;
