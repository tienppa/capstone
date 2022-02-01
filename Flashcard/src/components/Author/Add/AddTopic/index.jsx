import { changeModalVisible } from "redux/actions/status";
import { Form, Input, Radio, Button } from "antd";
import topicAPI from "apis/topic.api";
import Notification from "components/Notification";
import { useDispatch } from "react-redux";

function AddTopic(props) {
	const dispatch = useDispatch();
	const { TextArea } = Input;
	const [form] = Form.useForm();

	const layout = {
		labelCol: {
			span: 6,
		},
		wrapperCol: {
			span: 16,
		},
	};

	const refresh = () => {
		props.parentCallback();
	};

	const addTopic = async (values) => {
		try {
			const response = await topicAPI.addNewTopic(values);
			if ((response.status = "Success")) {
				refresh();
				Notification("success", response.message);
				dispatch(changeModalVisible(false));
				form.resetFields();
			} else {
				Notification("error", response.message);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="creater-container">
			<Form
				{...layout}
				form={form}
				name="add-topic"
				onFinish={addTopic}
				autoComplete="off"
			>
				<Form.Item
					name="topicName"
					label="Topic name:"
					rules={[
						{
							required: true,
							message: "Please input your topic",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="topicDescription"
					label="Topic description:"
					rules={[
						{
							required: true,
							message: "Please input your description",
						},
					]}
				>
					<TextArea showCount maxLength={500} />
				</Form.Item>
				<Form.Item name="statusId" label="Status:" initialValue={1}>
					<Radio.Group style={{ width: 40 }}>
						<Radio value={1}>Public</Radio>
						<Radio value={2}>Private</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
					<Button type="primary" htmlType="submit">
						Add new
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
export default AddTopic;
