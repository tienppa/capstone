import {
	DeleteOutlined,
	EditOutlined,
	ExclamationCircleOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import {
	Button,
	Card,
	Col,
	Descriptions,
	Empty,
	Image,
	Modal,
	Pagination,
	Row,
	Spin,
	Tag,
	Typography,
} from "antd";
import advAPI from "apis/ads.api";
import Notification from "components/Notification";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isShowAdsAdd, isShowAdsUpdate } from "redux/actions/donor";
import AddAds from "../AddAds";
import UpdateAds from "../UpdateAds";
import "./index.css";

const { Text } = Typography;
const { confirm } = Modal;

function ListAds() {
	const dispatch = useDispatch();
	const [update, setUpdate] = useState([]);

	const [ads, setAds] = useState([]);
	const [loading, setLoading] = useState(true);

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(10);

	const getAds = async () => {
		const response = await advAPI.getAds();
		if (response.status === "Success") {
			setAds(response.listAds);
		} else {
			console.log(response.message);
		}
		setLoading(false);
	};

	useEffect(() => {
		getAds();
	}, []);

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = ads.slice(indexOfFirstPost, indexOfLastPost);
	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	function onShowSizeChange(current, pageSize) {
		setPostsPerPage(pageSize);
	}

	const removeAds = async (id) => {
		const response = await advAPI.removeAds({ advertiseId: id });
		if (response.status === "Success") {
			Notification("success", response.message);
			getAds();
		} else {
			Notification("error", response.message);
		}
	};

	function showDeleteConfirm(id) {
		confirm({
			title: "Are you sure delete this item?",
			icon: <ExclamationCircleOutlined />,
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				removeAds(id);
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	}

	const showModal = () => {
		dispatch(isShowAdsAdd(true));
	};

	const showModalUpdate = (item) => {
		setUpdate(item);
		dispatch(isShowAdsUpdate(true));
	};

	return (
		<div className="ldonor__main-adv">
			<Button
				type="primary"
				icon={<PlusOutlined />}
				style={{ marginBottom: "15px" }}
				onClick={showModal}
			>
				Add ADS request
			</Button>
			<AddAds pCallback={getAds} />
			<UpdateAds pCallback={getAds} update={update} />
			{ads.length === 0 && <Empty style={{ margin: "20px 0" }} />}
			<Spin spinning={loading} delay={500}>
				{currentPosts?.map((item) => {
					return (
						<Card
							size="small"
							hoverable
							key={item.id}
							className="ldonor__adv-card"
						>
							<Row>
								<Col xs={24} xl={24} xxl={4}>
									<Image
										className="ldonor__adv-card-img"
										src={item.imageLink}
									/>
								</Col>
								<Col xs={24} xl={24} xxl={20}>
									<Descriptions size="small">
										<Descriptions.Item label="Advertisement" span={3}>
											<Text strong className="adv-purple">
												{item.title}
											</Text>
										</Descriptions.Item>
										<Descriptions.Item label="Content" span={3}>
											<Text>{item.content}</Text>
										</Descriptions.Item>
										<Descriptions.Item label="Start">
											<Text>
												{Moment(item.startDate).format("YYYY-MM-DD h:mm:ss")}
											</Text>
										</Descriptions.Item>
										<Descriptions.Item label="End">
											<Text>
												{Moment(item.endDate).format("YYYY-MM-DD h:mm:ss")}
											</Text>
										</Descriptions.Item>
										<Descriptions.Item label="Status">
											<Tag color="#2db7f5">{item.statusName}</Tag>
										</Descriptions.Item>
									</Descriptions>
									<div className="ldonor__adv-tools">
										<Button
											type="text"
											className="ldonor__adv-button"
											icon={<EditOutlined />}
											onClick={() => {
												showModalUpdate(item);
											}}
										></Button>
										<Button
											type="text"
											className="ldonor__adv-button"
											icon={<DeleteOutlined />}
											onClick={() => showDeleteConfirm(item.id)}
										></Button>
									</div>
								</Col>
							</Row>
						</Card>
					);
				})}
				<div style={{ display: "flex", justifyContent: "center" }}>
					<Pagination
						defaultCurrent={paginate}
						total={ads ? ads.length : 0}
						showSizeChanger
						onShowSizeChange={onShowSizeChange}
					/>
				</div>
			</Spin>
		</div>
	);
}
export default ListAds;
