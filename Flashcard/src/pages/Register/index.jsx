import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Radio } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import images from "constants/images";
import authAPI from "../../apis/auth.api";
import topicAPI from "../../apis/topic.api";
import Notification from "components/Notification";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerAction } from "../../redux/actions/user";

// import style
import "antd/dist/antd.css";
import "../../assets/css/account.css";

function RegisterPage() {
	const { Option } = Select;
	const dispatch = useDispatch();
	const history = useHistory();

	// get add topic
	const [topics, setTopics] = useState([]);
	useEffect(() => {
		const getTopics = async () => {
			try {
				const response = await topicAPI.getAllTopic();
				setTopics(response.listTopic);
			} catch (error) {
				console.log("Get add topic", error);
			}
		};
		getTopics();
	}, []);

	// create option topic in select
	const children = [];
	if (topics !== null) {
		topics.forEach(createOption);
	}
	function createOption(value, index, array) {
		children.push(<Option key={value.topicId}>{value.topicName}</Option>);
	}
	// value={parseInt(value.topicId, 10)}
	const onFinish = async (values) => {
		try {
			const response = await authAPI.register(values);
			if (response.status === "Success") {
				history.push("/login");
				const action = registerAction();
				dispatch(action);
				Notification("success", response.message);
			} else {
				Notification("error", response.message);
			}
		} catch (error) {
			console.log("Register error: ", error.message);
		}
	};

	return (
		<>
			<div className="back-to-home">
				<Link to="/" className="home-link">
					<HomeOutlined className="home-icon" /> Home
				</Link>
			</div>
			<div className="limiter">
				<div className="container">
					<div className="wrap">
						<div className="pic js-tilt" data-tilt>
							<img src={images.SIGNUP_SVG} alt="IMG" />
						</div>

						<Form
							name="normal_login"
							className="form-control"
							onFinish={onFinish}
							autoComplete="off"
						>
							<span className="form-control-title">Register From</span>
							<Form.Item
								name="email"
								className="form-group"
								rules={[
									{
										required: true,
										type: "email",
										message: "Please input your Email!",
									},
								]}
							>
								<Input
									className="form-input"
									type="email"
									placeholder="Email"
								/>
							</Form.Item>

							<Form.Item
								name="password"
								className="form-group"
								rules={[
									{
										required: true,
										min: 6,
										message: "Please input your Password!",
									},
								]}
							>
								<Input
									className="form-input"
									type="password"
									placeholder="Password"
								/>
							</Form.Item>

							<Form.Item
								name="fullName"
								className="form-group"
								rules={[
									{ required: true, message: "Please input your Fullname!" },
								]}
							>
								<Input
									className="form-input"
									type="text"
									placeholder="Fullname"
								/>
							</Form.Item>

							<Form.Item
								name="phone"
								className="form-group"
								rules={[
									{
										required: true,
										pattern: "[0-9]{10}",
										message: "Type at: 0867677061",
									},
								]}
							>
								<Input className="form-input" type="text" placeholder="Phone" />
							</Form.Item>

							<Form.Item
								name="address"
								className="form-group"
								rules={[
									{ required: true, message: "Please input your Address!" },
								]}
							>
								<Input
									className="form-input"
									type="text"
									placeholder="Address"
								/>
							</Form.Item>

							<Form.Item
								name="DOB"
								className="form-group"
								rules={[
									{
										required: true,
										message: "Please input your Date of birth!",
									},
								]}
							>
								<Input
									className="form-input"
									type="date"
									placeholder="Date of birth"
								/>
							</Form.Item>

							<Form.Item
								name="roleId"
								className="form-group"
								rules={[
									{
										required: true,
										message: "Please select your role!",
									},
								]}
							>
								<Select size="large" className="select-re" placeholder="Role:">
									<Option value="1">Learner</Option>
									<Option value="3">Donor</Option>
								</Select>
							</Form.Item>

							<Form.Item name="interestTopic" className="form-group">
								<Select
									size="large"
									className="select-re"
									mode="multiple"
									placeholder="Interest topics:"
								>
									{children}
								</Select>
							</Form.Item>

							<Form.Item
								name="gender"
								rules={[{ required: true, message: "Please pick an item!" }]}
							>
								<Radio.Group className="form-group" label="Radio.Group">
									<Radio value={"male"}>Male</Radio>
									<Radio value={"female"}>Female</Radio>
									<Radio value={"other"}>Other</Radio>
								</Radio.Group>
							</Form.Item>

							<div name="rule" className="form-group">
								By clicking you agree with our{" "}
								<Link className="link-a" to="">
									Term of use.
								</Link>
							</div>

							<div className="form-group">
								<Button htmlType="submit" className="form-control-btn">
									Register
								</Button>
							</div>
							<div className="form-group text-center p-t-50">
								Already account{" "}
								<Link className="link-a" to="/login">
									Login
								</Link>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
}

export default RegisterPage;
