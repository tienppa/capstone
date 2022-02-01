import { Form, Input, Switch } from "antd";
import Notification from "components/Notification";
import { useSelector } from "react-redux";
import images from "constants/images";
import { useState } from "react";
import authAPI from "apis/auth.api";

const ProfileForm = () => {
	const [isActive, setActived] = useState(false);

	const user = useSelector((state) => state.user.currentUser);
	if (!user) return;

	const onFinish = async (values) => {
		try {
			const response = await authAPI.editPassword(values);
			if (response.status === "Success") {
				Notification("success", response.message);
			} else {
				Notification("error", response.message);
			}
		} catch (error) {
			console.log("Change password", error.message);
		}
	};

	return (
		<div className="fprofile-main__wrap">
			<div className="fprofile-left">
				<img src={images.USER_PIC} alt="" className="fprofile-img" />
			</div>
			<div className="fprofile-right">
				{user && (
					<Form
						name="normal_profile"
						className="normal_profile"
						onFinish={onFinish}
						autoComplete="off"
					>
						<label className="fprofile-form-label">Current password:</label>
						<Form.Item
							name="oldPassword"
							className="fprofile-form-group"
							rules={[
								{
									required: true,
									min: 6,
									message: "Please input a password",
								},
							]}
						>
							<Input
								className="fprofile-form-input"
								type={isActive ? "text" : "password"}
								placeholder="New password"
							/>
						</Form.Item>
						<label className="fprofile-form-label">New password:</label>
						<Form.Item
							name="newPassword"
							className="fprofile-form-group"
							rules={[
								{
									required: true,
									min: 6,
									message: "Please input a password",
								},
							]}
						>
							<Input
								className="fprofile-form-input"
								type={isActive ? "text" : "password"}
								placeholder="New password"
							/>
						</Form.Item>
						<label className="fprofile-form-label">Confirm new password:</label>
						<Form.Item
							name="confirm"
							className="fprofile-form-group"
							rules={[
								{
									required: true,
									min: 6,
								},
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (!value || getFieldValue("newPassword") === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											"The two passwords that you entered do not match!"
										);
									},
								}),
							]}
						>
							<Input
								className="fprofile-form-input"
								type={isActive ? "text" : "password"}
								placeholder="Confirm new password"
							/>
						</Form.Item>
						<div className="fprofile-form-group">
							<Switch onClick={() => setActived(!isActive)} /> Show password
						</div>

						<button className="fprofile-button" type="submit">
							Update Password
						</button>
					</Form>
				)}
			</div>
		</div>
	);
};

export default ProfileForm;
