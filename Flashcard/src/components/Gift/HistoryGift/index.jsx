import {
	Table,
	Tag,
	Space,
	Button,
	Typography,
	Modal,
	Form,
	Rate,
	Input,
} from "antd";
import giftAPI from "apis/gift.api";
import { useEffect, useState } from "react";
import Moment from "moment";
import feedbackAPI from "apis/feedback.api";
import Notification from "components/Notification";

const { Text, Paragraph } = Typography;
const { TextArea } = Input;
const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 16 },
};

function HistoryGift() {
	const [form] = Form.useForm();
	const [history, setHistory] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [feedback, setFeedback] = useState();

	const getHistory = async () => {
		const response = await giftAPI.getGiftReceive();
		if (response.status === "Success") {
			setHistory(response.listServices);
			setLoading(false);
		} else {
			console.log(response.message);
		}
	};

	useEffect(() => {
		getHistory();
	}, []);

	const columns = [
		{
			title: "Gift",
			dataIndex: "gift",
			key: "gift",
			render: (text) => <Text type="success">{text}</Text>,
		},
		{
			title: "Information",
			dataIndex: "info",
			key: "info",
			render: (text) => (
				<Paragraph
					ellipsis={{
						rows: 2,
						expandable: true,
					}}
					title={`${text}`}
				>
					{text}
				</Paragraph>
			),
		},
		{
			title: "Quantity",
			dataIndex: "quantity",
			key: "quantity",
			render: (text) => <Tag color="#2db7f5">{text}</Tag>,
		},
		{
			title: "Date of receipt",
			dataIndex: "date",
			key: "date",
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<Space size="middle">
					<Button
						type="primary"
						onClick={() => showModal(record.key)}
						disabled={record.isFeedback === 1 ? true : false}
					>
						Feedback
					</Button>
				</Space>
			),
		},
	];

	let data = [];
	history?.map((item) => {
		data.push({
			key: item.id,
			gift: item.serviceName,
			info: item.serviceInformation,
			isFeedback: item.isFeedback,
			quantity: item.quantity,
			date: Moment(item.dateOfReceived).format("YYYY-MM-DD h:mm:ss"),
		});
	});

	const showModal = (id) => {
		setFeedback(id);
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const onFinish = async (values) => {
		console.log(values);
		const params = {
			donorServiceRelationAccountId: feedback,
			point: values.point,
			content: values.content,
		};
		const response = await feedbackAPI.sendFeedback(params);
		if (response.status === "Success") {
			Notification("success", response.message);
			getHistory();
			handleOk();
			onReset();
		} else {
			Notification("error", response.message);
		}
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<div style={{ maxWidth: "1024px" }}>
			<Modal
				title="Feedback Gift"
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				width="800px"
				footer={false}
			>
				<Form
					name="validate_other"
					{...formItemLayout}
					form={form}
					onFinish={onFinish}
				>
					<Form.Item
						name="point"
						label="Point"
						rules={[{ required: true, message: "Point is require!" }]}
					>
						<Rate />
					</Form.Item>
					<Form.Item
						label="Opinion"
						name="content"
						rules={[{ required: true, message: "Opinion is require!" }]}
					>
						<TextArea rows={3} />
					</Form.Item>

					<Form.Item wrapperCol={{ span: 12, offset: 6 }}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
						<Button
							htmlType="button"
							onClick={onReset}
							style={{ marginLeft: "8px" }}
						>
							Reset
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Table
				loading={loading}
				size="small"
				columns={columns}
				dataSource={data}
			/>
		</div>
	);
}
export default HistoryGift;
