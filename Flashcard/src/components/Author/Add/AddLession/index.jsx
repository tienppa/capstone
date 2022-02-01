import { changeModalVisible } from "redux/actions/status";
import { Form, Input, Radio, Button } from "antd";
import lessionAPI from "apis/lession.api";
import Notification from "components/Notification";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function AddLession(props) {
	const [form] = Form.useForm();
	const { TextArea } = Input;
	const dispatch = useDispatch();
	let { search } = useLocation();
	let query = new URLSearchParams(search);
	const subjectId = query.get("subjectId");

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

	const onFinish = async (values) => {
		if (!values) return;
		try {
			let newValues = Object.assign({ subjectId: subjectId }, values);
			const response = await lessionAPI.createLessionBySubId(newValues);
			if (response.status === "Success") {
				Notification("success", response.message);
				refresh();
				form.resetFields();
				dispatch(changeModalVisible(false));
			} else {
				Notification("error", response.message);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="creater-container">
			<Form {...layout} form={form} name="nest-messages" onFinish={onFinish}>
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
export default AddLession;
