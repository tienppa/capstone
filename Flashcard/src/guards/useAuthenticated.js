import { message } from "antd";
const { useSelector } = require("react-redux");

export function useAuthenticated() {
	return useSelector((state) => Boolean(state.user.currentUser));
}

const AppExpired = () => {
	const { currentUser } = useSelector((state) => state.user);
	if (currentUser) {
		const exp = currentUser.exp;
		if (exp * 1000 < Date.now()) {
			message.error("Token is expired, try login again!");
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
};
export default AppExpired;
