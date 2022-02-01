import {
	DeleteOutlined,
	EditOutlined,
	ExclamationCircleOutlined,
	FieldTimeOutlined,
	CaretRightOutlined,
} from "@ant-design/icons";
import { Card, Empty, Modal, Tag, Typography } from "antd";
import subjectAPI from "apis/subject.api";
import Notification from "components/Notification";
import Moment from "moment";
import { Link, useLocation } from "react-router-dom";
import "../index.css";

const { Paragraph } = Typography;
const { confirm } = Modal;
const ellipsis = { rows: 2, expandable: true, symbol: "more" };

function Subject(props) {
	let { search } = useLocation();
	let query = new URLSearchParams(search);
	const topicId = query.get("topicId");
	const { subjects } = props;

	const refresh = () => {
		props.parentCallback();
	};

	const findSubject = (id) => {
		if (!subjects) return;
		return subjects.find((item) => item.subjectId === id);
	};

	const removeSubject = async (id) => {
		const resp = await subjectAPI.removeSubjectById({ subjectId: id });
		if (resp.status === "Success") {
			Notification("success", resp.message);
			refresh();
		} else {
			Notification("error", resp.message);
		}
	};

	const showDeleteConfirm = (id) => {
		confirm({
			title: "Are you sure delete this item",
			icon: <ExclamationCircleOutlined />,
			content: "Some descriptions",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				removeSubject(id);
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const setSubjectUpdateParent = (id) => {
		props.setSubjectUpdate(findSubject(id));
	};

	return (
		<div className="author-card__cover">
			{subjects?.map((item) => {
				if (item.topicId == topicId) {
					return (
						<Card
							size="small"
							className="author-card"
							key={"card-subject" + item.subjectId}
							title={
								<Link to={"/author/lession?subjectId=" + item.subjectId}>
									{item.subjectName} <CaretRightOutlined />
								</Link>
							}
							extra={item.statusId === 2 && <Tag color="#f50">Private</Tag>}
						>
							<Paragraph ellipsis={ellipsis}>
								{item.subjectDescription}
							</Paragraph>
							<div className="author-card__footer">
								<span className="author-card__date">
									<FieldTimeOutlined />{" "}
									{Moment(item.createdDate).format("YYYY-MM-DD")}
								</span>
								<div className="author-card__group">
									<EditOutlined
										onClick={() => {
											setSubjectUpdateParent(item.subjectId);
										}}
									/>
									<DeleteOutlined
										onClick={() => {
											showDeleteConfirm(item.subjectId);
										}}
									/>
								</div>
							</div>
						</Card>
					);
				}
			})}
			{subjects?.length === 0 && (
				<div className="empty-container">
					<Empty />
				</div>
			)}
		</div>
	);
}

export default Subject;
