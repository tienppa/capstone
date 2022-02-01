export const changeModalVisible = (payload) => {
	return {
		type: "CHANGE_MODAL_VISIBLE",
		payload: payload,
	};
};
export const changeDrawerVisible = (payload) => {
	return {
		type: "CHANGE_DRAWER_VISIBLE",
		payload: payload,
	};
};
export const changeModalUpdateVisible = (payload) => {
	return {
		type: "CHANGE_MODAL_UPDATE_VISIBLE",
		payload: payload,
	};
};
export const changeTypeRadioLatest = (payload) => {
	return {
		type: "CHANGE_TYPE_RADIO_LATEST",
		payload: payload,
	};
};
export const changeCheckAll = (payload) => {
	return {
		type: "CHANGE_CHECK_ALL",
		payload: payload,
	};
};
