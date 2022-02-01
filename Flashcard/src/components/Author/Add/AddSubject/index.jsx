import { changeModalVisible } from "redux/actions/status";
import { Button, Form, Input, Radio } from "antd";
import subjectAPI from "apis/subject.api";
import Notification from "components/Notification";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const { TextArea } = Input;
const layout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 16,
	},
};

function AddSubject(props) {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	let { search } = useLocation();
	let query = new URLSearchParams(search);
	const topicId = query.get("topicId");

	const refresh = () => {
		props.parentCallback();
	};

	const onFinish = (values) => {
		if (!values) return;
		addSubject(values);
	};

	const addSubject = async (values) => {
		if (!values) return;
		let newValues = Object.assign({ topicId: topicId }, values);
		const response = await subjectAPI.addSubjectByTopicId(newValues);
		if (response.status === "Success") {
			Notification("success", response.message);
			refresh();
			form.resetFields();
			dispatch(changeModalVisible(false));
		} else {
			Notification("error", response.message);
		}
	};

	return (
		<div className="creater-container">
			<Form
				{...layout}
				form={form}
				name="add-subject"
				onFinish={onFinish}
				initialValues={{ statusId: 1 }}
			>
				<Form.Item
					name="subjectName"
					label="Subject name:"
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
					name="subjectDescription"
					label="Subject description:"
					rules={[
						{
							required: true,
							message: "Please input subject description",
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
						Add subject
					</Button>
					<Button
						style={{ margin: "0 8px" }}
						onClick={() => {
							form.resetFields();
						}}
					>
						Clear
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
export default AddSubject;
