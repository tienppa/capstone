import { Button, Form, Input, Modal, Select } from "antd";
import donorAPI from "apis/donor.api";
import Notification from "components/Notification";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isShowUpdate } from "redux/actions/donor";

const { Option } = Select;
const layout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 18,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 6,
		span: 18,
	},
};

function Update(props) {
	const { isUpdate } = useSelector((state) => state.donor);
	const dispatch = useDispatch();
	const { service, types } = props;
	const [form] = Form.useForm();

	useEffect(() => {
		if (service) {
			form.setFieldsValue({
				serviceId: service.id,
				serviceName: service.serviceName,
				serviceTypeId: service.serviceTypeId,
				serviceInformation: service.serviceInformation,
				quantity: service.quantity,
			});
		}
	}, [service]);

	const handleCancel = () => {
		dispatch(isShowUpdate(false));
	};

	const onFinish = async (values) => {
		const response = await donorAPI.updateService(values);
		console.log(response);
		if (response.status === "Success") {
			Notification("success", response.message);
			onReset();
			handleCancel();
			props.pCallback();
		} else {
			Notification("error", response.message);
		}
	};

	const onReset = () => {
		form.resetFields();
	};

	const children = [];
	types.map((item) => {
		children.push(
			<Option key={item.id} value={item.id}>
				{item.typeName}
			</Option>
		);
	});

	return (
		<Modal
			title="Update service"
			visible={isUpdate}
			onCancel={handleCancel}
			width={700}
			footer={false}
		>
			<Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
				<Form.Item name="serviceId" hidden>
					<Input type="number" />
				</Form.Item>
				<Form.Item
					name="serviceName"
					label="Name"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="serviceTypeId"
					label="Type"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Select
						placeholder="Select a option and change input text above"
						allowClear
					>
						{children}
					</Select>
				</Form.Item>
				<Form.Item
					name="serviceInformation"
					label="Information"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="quantity"
					label="Quantity"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input type="number" min={0} />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
}
export default Update;
