import { Form, Select } from "antd";
import authAPI from "apis/auth.api";
import topicAPI from "apis/topic.api";
import Notification from "components/Notification";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHobbyTopic } from "redux/actions/user";

const HobbyTopic = () => {
	const { Option } = Select;
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();

	const updateState = (array) => {
		if (!user) return;
		let userObj = { ...user };
		userObj.interestTopic = JSON.stringify(array.interestTopic);
		return userObj;
	};

	// get add topic
	const [topics, setTopics] = useState([]);
	useEffect(() => {
		const getTopics = async () => {
			try {
				const response = await topicAPI.getAllTopic();
				setTopics(response.listTopic);
			} catch (error) {
				console.log("Hobby topic:", error.message);
			}
		};
		getTopics();
	}, []);

	// create option topic in select
	const children = [];
	if (topics !== null) {
		topics.forEach(createOption);
	}
	const hobby = {
		interestTopic: JSON.parse(user.interestTopic),
	};

	function createOption(value, index, array) {
		children.push(
			<Option key={value.topicId} value={`${value.topicId}`}>
				{value.topicName}
			</Option>
		);
	}

	const onFinish = async (values) => {
		try {
			const response = await authAPI.updateHobbyTopic(values);
			if (response.status === "Success") {
				Notification("success", response.message);
				let update = updateState(values);
				dispatch(updateHobbyTopic(update));
			} else {
				Notification("error", response.message);
			}
		} catch (error) {
			console.log("Update hobby: ", error.message);
		}
	};

	return (
		<div className="fprofile-main__wrap">
			<div className="fprofile-left">
				<h3 className="fprofile-name"></h3>
			</div>
			<div className="fprofile-right">
				{user && (
					<Form
						name="normal_profile"
						className="normal_profile"
						initialValues={hobby}
						onFinish={onFinish}
					>
						<label className="fprofile-form-label">Hobby Topic:</label>
						<label className="fprofile-form-label">
							Updating your favorite topics helps us to have more accurate
							recommendations
						</label>
						<Form.Item name="interestTopic">
							<Select size="large" className="form-group" mode="multiple">
								{children}
							</Select>
						</Form.Item>
						<button className="fprofile-button" type="submit">
							Update Topic
						</button>
					</Form>
				)}
			</div>
		</div>
	);
};

export default HobbyTopic;
