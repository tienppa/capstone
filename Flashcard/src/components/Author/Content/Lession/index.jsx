import {
	DeleteOutlined,
	EditOutlined,
	ExclamationCircleOutlined,
	FieldTimeOutlined,
	CaretRightOutlined,
} from "@ant-design/icons";
import { Card, Empty, Modal, Tag, Typography } from "antd";
import lessionAPI from "apis/lession.api";
import Notification from "components/Notification";
import Moment from "moment";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../index.css";

const { Paragraph } = Typography;
const { confirm } = Modal;
const ellipsis = { rows: 2, expandable: true, symbol: "more" };

function Lession(props) {
	const hitory = useHistory();
	let { search } = useLocation();
	let query = new URLSearchParams(search);
	const subjectId = query.get("subjectId");
	const { lessions } = props;

	const removeLession = async (id) => {
		try {
			const resp = await lessionAPI.removeLessionById({ lessionId: id });
			if (resp.status === "Success") {
				Notification("success", resp.message);
				refresh();
			} else {
				Notification("error", resp.message);
			}
		} catch (error) {
			console.log("Delete lession: ", error.message);
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
				removeLession(id);
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const refresh = () => {
		props.parentCallback();
	};

	const findLession = (id) => {
		if (!lessions) return;
		return lessions.find((item) => item.lessionId === id);
	};

	const setLessionUpdateParent = (id) => {
		props.setLessionUpdate(findLession(id));
	};

	const callLink = (lessionId) => {
		hitory.push(`${"/author/flashcard?lessionId=" + lessionId}`);
	};

	return (
		<div className="author-card__cover">
			{lessions?.map((item) => {
				if (item.subjectId == subjectId) {
					return (
						<Card
							size="small"
							className="author-card"
							key={"card-lession" + item.lessionId}
							title={
								<Link to={"/author/flashcard?lessionId=" + item.lessionId}>
									{item.lessionName} <CaretRightOutlined />
								</Link>
							}
							extra={item.statusId === 2 && <Tag color="#f50">Private</Tag>}
						>
							<Paragraph ellipsis={ellipsis}>
								{item.lessionDescription}
							</Paragraph>
							<div className="author-card__footer">
								<span className="author-card__date">
									<FieldTimeOutlined />{" "}
									{Moment(item.createdDate).format("YYYY-MM-DD")}
								</span>
								<div className="author-card__group">
									<EditOutlined
										onClick={() => {
											setLessionUpdateParent(item.lessionId);
										}}
									/>
									<DeleteOutlined
										onClick={() => {
											showDeleteConfirm(item.lessionId);
										}}
									/>
								</div>
							</div>
						</Card>
					);
				}
			})}
			{lessions?.length === 0 && (
				<div className="empty-container">
					<Empty />
				</div>
			)}
		</div>
	);
}

export default Lession;
