export const isShowUpdate = (payload) => {
	return {
		type: "IS_SHOW_UPDATE",
		payload: payload,
	};
};
export const isShowAdd = (payload) => {
	return {
		type: "IS_SHOW_ADD",
		payload: payload,
	};
};
export const isShowAdsAdd = (payload) => {
	return {
		type: "IS_SHOW_ADS_ADD",
		payload: payload,
	};
};
export const isShowAdsUpdate = (payload) => {
	return {
		type: "IS_SHOW_ADS_UPDATE",
		payload: payload,
	};
};
