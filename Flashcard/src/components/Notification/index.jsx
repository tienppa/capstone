import { notification } from "antd";

const Notification = (type, desc) => {
	notification[type]({
		message: "Notification",
		description: `${desc}`,
		placement: "bottomRight",
	});
};

export default Notification;
