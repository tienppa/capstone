import { Form, Input, Modal, Radio } from "antd";
import { default as React, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { passAccountToAction, setShowModal } from "redux/actions/admin";
import adminAPI from "apis/admin.api";
import Notification from "components/Notification";

// ModalAccountAction.propTypes = {
//     item: PropTypes.string,
// };
// ModalAccountAction.defaultProps = {
//     item: null,
// };
function ModalAccountAction(props) {
	const [visible, setVisible] = useState(false);

	const dispatch = useDispatch();
	const isShowModal = useSelector((state) => state.admin.isShowModal);
	const accountToAction = useSelector((state) => state.admin.accountToAction);

	const onBanAccount = async (values) => {
		console.log(accountToAction.email);
		console.log(values);
		dispatch(setShowModal(false));

		let current = new Date();
		let cDate =
			current.getFullYear() +
			"-" +
			(current.getMonth() + 1) +
			"-" +
			current.getDate();
		let cTime =
			current.getHours() +
			":" +
			current.getMinutes() +
			":" +
			current.getSeconds();
		let dateTime = cDate + " " + cTime;

		const params = {
			email: accountToAction.email,
			adminDescription: `${dateTime} - ${values.description}`,
		};
		const response = await adminAPI.banAccount(params);
		console.log(response);
		if (response.status === "Success") {
			Notification("success", response.message);
		} else {
			Notification("error", response.message);
		}
	};
	const onCancel = () => {
		// const { item } = props
		console.log(accountToAction);

		dispatch(passAccountToAction(null));
		dispatch(setShowModal(false));
	};
	useEffect(() => {
		setVisible(isShowModal);
	}, [isShowModal]);
	const [form] = Form.useForm();
	return (
		<Modal
			visible={visible}
			title="Why you want to ban this account ? "
			okText="Ban Account"
			cancelText="Cancel"
			onCancel={onCancel}
			onOk={() => {
				form
					.validateFields()
					.then((values) => {
						form.resetFields();
						onBanAccount(values);
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
		>
			{accountToAction && (
				<div>
					<p>
						{" "}
						Name:{" "}
						<span style={{ fontWeight: 600 }}>{accountToAction.fullName}</span>
					</p>
					<p>
						{" "}
						Email:{" "}
						<span style={{ fontWeight: 600 }}>{accountToAction.email}</span>
					</p>
				</div>
			)}
			<Form
				form={form}
				layout="vertical"
				name="form_in_modal"
				initialValues={{ modifier: "public" }}
			>
				{/* <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                    <Input />
                </Form.Item> */}
				<Form.Item name="description" label="Description: ">
					<Input type="textarea" />
				</Form.Item>
				{/* <Form.Item name="modifier" className="collection-create-form_last-form-item">
                    <Radio.Group>
                        <Radio value="public">Public</Radio>
                        <Radio value="private">Private</Radio>
                    </Radio.Group>
                </Form.Item> */}
			</Form>
		</Modal>
	);
}

export default ModalAccountAction;
