import {
	DeleteOutlined,
	EditOutlined,
	FieldTimeOutlined,
	ExclamationCircleOutlined,
	CaretRightOutlined,
} from "@ant-design/icons";
import { Card, Tag, Typography, Modal, Empty } from "antd";
import topicAPI from "apis/topic.api";
import Moment from "moment";
import Notification from "components/Notification";
import { Link, useHistory } from "react-router-dom";
import "../index.css";

const { Paragraph } = Typography;
const { confirm } = Modal;
const ellipsis = { rows: 2, expandable: true, symbol: "more" };

function Topic(props) {
	const history = useHistory();
	const { topics } = props;

	const refresh = () => {
		props.parentCallback();
	};

	const deleteTopic = async (id) => {
		const response = await topicAPI.removeTopicById({ topicId: id });
		if (response.status === "Success") {
			refresh();
			Notification("success", response.message);
		} else {
			Notification("error", response.message);
		}
	};

	function showDeleteConfirm(id) {
		confirm({
			title: "Are you sure delete this task?",
			icon: <ExclamationCircleOutlined />,
			content: "Some descriptions",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				deleteTopic(id);
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	}

	return (
		<div className="author-card__cover">
			{topics?.map((topic) => {
				return (
					<Card
						size="small"
						className="author-card"
						title={
							<Link to={"/author/subject?topicId=" + topic.topicId}>
								{topic.topicName} <CaretRightOutlined />
							</Link>
						}
						key={"card-topic" + topic.topicId}
						extra={topic.statusId === 2 && <Tag color="#f50">Private</Tag>}
					>
						<Paragraph ellipsis={ellipsis}>{topic.topicDescription}</Paragraph>
						<div className="author-card__footer">
							<span className="author-card__date">
								<FieldTimeOutlined />{" "}
								{Moment(topic.createdDate).format("YYYY-MM-DD")}
							</span>
							<div className="author-card__group">
								<EditOutlined />
								<DeleteOutlined
									onClick={() => {
										showDeleteConfirm(topic.topicId);
									}}
								/>
							</div>
						</div>
					</Card>
				);
			})}
			{topics?.length === 0 && (
				<div className="empty-container">
					<Empty />
				</div>
			)}
		</div>
	);
}

export default Topic;
