import { changeModalUpdateVisible } from "redux/actions/status";
import { Button, Form, Input, Radio } from "antd";
import lessionAPI from "apis/lession.api";
import Notification from "components/Notification";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const layout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 16,
	},
};
const { TextArea } = Input;

function UpdateLession(props) {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { lession } = props;

	useEffect(() => {
		form.resetFields();
	}, [lession]);

	const refresh = () => {
		props.parentCallback();
	};

	const onFinish = (values) => {
		if (values) {
			Object.assign(values, { lessionId: lession.lessionId });
			updateLession(values);
		}
	};

	const updateLession = async (lession) => {
		const response = await lessionAPI.updateLessionById(lession);
		if (response.status === "Success") {
			Notification("success", response.message);
			dispatch(changeModalUpdateVisible(false));
			refresh();
			form.resetFields();
		} else {
			Notification("error", response.message);
		}
	};

	return (
		<div className="creater-container">
			<Form
				{...layout}
				form={form}
				name="nest-messages"
				initialValues={lession}
				onFinish={onFinish}
			>
				<Form.Item
					name="lessionName"
					label="Lession name:"
					rules={[
						{
							required: true,
							message: "Please input your subject",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="lessionDescription"
					label="Lession description:"
					rules={[
						{
							required: true,
							message: "Please input your description",
						},
					]}
				>
					<TextArea showCount maxLength={500} />
				</Form.Item>
				<Form.Item name="statusId" label="Status:">
					<Radio.Group style={{ width: 40 }}>
						<Radio value={1}>Public</Radio>
						<Radio value={2}>Private</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
					<Button type="primary" htmlType="submit">
						Update
					</Button>
					<Button
						style={{ margin: "0 8px" }}
						onClick={() => {
							form.resetFields();
						}}
					>
						Reset
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
export default UpdateLession;
