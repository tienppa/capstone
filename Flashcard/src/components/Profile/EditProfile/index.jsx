import React, { useState, useEffect } from "react";
import { Form, Input, Select, Radio } from "antd";
import Moment from "moment";
import Notification from "components/Notification";
import authAPI from "apis/auth.api";
import Images from "constants/images";
import { saveProfileAction } from "redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

const radioStyle = {
	height: "44px",
	padding: "5px",
};

const ProfileForm = () => {
	const [form] = Form.useForm();
	const { Option } = Select;
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.user);

	const getProfile = async () => {
		try {
			const response = await authAPI.getMe();
			console.log(response);
			dispatch(saveProfileAction(response.account));
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		form.setFieldsValue({
			email: currentUser?.email,
			fullName: currentUser?.fullName,
			roleId: currentUser?.roleId,
			phone: currentUser?.phone,
			address: currentUser?.address,
			DOB: Moment(currentUser?.DOB).format("YYYY-MM-DD"),
			gender: currentUser?.gender,
		});
	}, [currentUser]);

	const onFinish = async (values) => {
		try {
			const response = await authAPI.updateProfile(values);
			if (response.status === "Success") {
				Notification("success", response.message);
				getProfile();
			} else {
				Notification("error", response.message);
			}
		} catch (error) {
			console.log("Update profile", error.message);
		}
	};

	return (
		<div className="fprofile-main__wrap">
			<div className="fprofile-left">
				<img src={Images.USER_PIC} alt="" className="fprofile-img" />
				<h3 className="fprofile-name"></h3>
			</div>
			<div className="fprofile-right">
				{currentUser && (
					<Form
						form={form}
						name="normal_profile"
						className="normal_profile"
						autoComplete="off"
						onFinish={onFinish}
					>
						<label className="fprofile-form-label">Email:</label>
						<Form.Item
							name="email"
							className="fprofile-form-group"
							rules={[
								{
									required: true,
									type: "email",
									message: "Please input your Email!",
								},
							]}
						>
							<Input
								className="fprofile-form-input"
								type="email"
								placeholder="Email"
								readOnly
							/>
						</Form.Item>
						<label className="fprofile-form-label">Fullname:</label>
						<Form.Item
							name="fullName"
							className="fprofile-form-group"
							rules={[
								{ required: true, message: "Please input your Fullname!" },
							]}
						>
							<Input
								className="fprofile-form-input"
								type="text"
								placeholder="Fullname"
							/>
						</Form.Item>
						<label className="fprofile-form-label">Phone:</label>
						<Form.Item
							name="phone"
							className="fprofile-form-group"
							rules={[
								{
									required: true,
									pattern: "[0-9]{10}",
									message: "Type at: 0867677061",
								},
							]}
						>
							<Input
								className="fprofile-form-input"
								type="text"
								placeholder="Phone"
							/>
						</Form.Item>
						<label className="fprofile-form-label">Address:</label>
						<Form.Item
							name="address"
							className="fprofile-form-group"
							rules={[
								{ required: true, message: "Please input your Address!" },
							]}
						>
							<Input
								className="fprofile-form-input"
								type="text"
								placeholder="Address"
							/>
						</Form.Item>
						<label className="fprofile-form-label">Birthday:</label>
						<Form.Item
							name="DOB"
							className="fprofile-form-group"
							rules={[
								{
									required: true,
									message: "Please input your Date of birth!",
								},
							]}
						>
							<Input
								className="fprofile-form-input"
								type="date"
								placeholder="Date of birth"
							/>
						</Form.Item>
						<label className="fprofile-form-label">Role</label>
						<Form.Item
							name="roleId"
							className="fprofile-form-group"
							rules={[
								{
									required: true,
									message: "Please select your role!",
								},
							]}
						>
							<Select size="default" className="fprofile-re ">
								<Option value={1}>Student</Option>
								<Option value={3}>Donor</Option>
							</Select>
						</Form.Item>
						<label className="fprofile-form-label">Gender</label>
						<Form.Item
							name="gender"
							className="fprofile-form-group"
							rules={[{ required: true, message: "Please pick an item!" }]}
						>
							<Radio.Group className="fprofile-form-radio" label="Radio.Group">
								<Radio.Button
									className="radio-button"
									value={"male"}
									style={radioStyle}
								>
									Male
								</Radio.Button>
								<Radio.Button
									className="radio-button"
									value={"female"}
									style={radioStyle}
								>
									Female
								</Radio.Button>
								<Radio.Button
									className="radio-button"
									value={"other"}
									style={radioStyle}
								>
									Other
								</Radio.Button>
							</Radio.Group>
						</Form.Item>
						<button className="fprofile-button" type="submit">
							Update Profile
						</button>
					</Form>
				)}
			</div>
		</div>
	);
};

export default ProfileForm;
