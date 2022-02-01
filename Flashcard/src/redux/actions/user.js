export const saveProfileAction = (payload) => {
	return {
		type: "LOGIN_USER",
		payload: payload,
	};
};
export const updateProfileAction = (payload) => {
	return {
		type: "UPDATE_PROFILE",
		payload: payload,
	};
};
export const registerAction = () => {
	return {
		type: "REGISTER_USER",
	};
};

export const logoutAction = (payload) => {
	return {
		type: "LOGOUT",
		payload: payload,
	};
};
export const updateHobbyTopic = (payload) => {
	return {
		type: "UPDATE_HOBBY_TOPIC",
		payload: payload,
	};
};
export const updatePointUser = (payload) => {
	return {
		type: "UPDATE_POINT_USER",
		payload: payload,
	};
};
