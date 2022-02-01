import {
	MinusOutlined,
	PlusOutlined,
	DeleteOutlined,
	QuestionCircleOutlined,
} from "@ant-design/icons";
import {
	Button,
	Descriptions,
	Popconfirm,
	Space,
	Table,
	Tag,
	Typography,
	Card,
	message,
	Empty,
} from "antd";
import giftAPI from "apis/gift.api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "components/Notification";
import {
	addQuantity,
	addToProducts,
	removeFromCart,
	subtractQuantity,
} from "redux/actions/cart";
import { saveProfileAction } from "redux/actions/user";
import authAPI from "apis/auth.api";

const { Text } = Typography;

const style = {
	position: "absolute",
	right: 0,
	bottom: 0,
};

function Cart() {
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.cart);
	const [point, setPoint] = useState(0);

	const add = (id) => {
		let item = products.find((element) => {
			if (element.id === id && element.selected === true) {
				return true;
			}
		});
		if (item.quantity < item.max) {
			dispatch(addQuantity(id));
			message.success("Add gift success.");
		} else {
			message.warning("Out of stock.");
		}
	};
	const sub = (id) => {
		let item = products.find((element) => {
			if (element.id === id && element.selected === true) {
				return true;
			}
		});
		if (item.quantity > 1) {
			dispatch(subtractQuantity(id));
			message.success("Decrease item success.");
		} else {
			remove(id);
		}
	};
	const remove = (id) => {
		dispatch(removeFromCart(id));
	};
	const emptyCart = () => {
		dispatch(addToProducts([]));
	};

	useEffect(() => {
		let po = 0;
		products?.map((item) => {
			if (item.selected === true) {
				po = po + item.quantity * 600;
			}
		});
		setPoint(po);
	}, [products]);

	const onSubmit = () => {
		const listServiceDetail = [];
		products?.map((item) => {
			if (item.selected === true) {
				listServiceDetail.push({
					serviceDetailId: item.id,
					quantity: item.quantity,
				});
			}
		});
		if (listServiceDetail.length === 0) {
			message.warning("Cart is empty.");
			return;
		}
		const params = {
			email: currentUser.email,
			total: point,
			listServiceDetail: listServiceDetail,
		};
		saveRelation(params);
	};

	const getUserAction = async () => {
		const response = await authAPI.getMe();
		dispatch(saveProfileAction(response.account));
	};

	const saveRelation = async (params) => {
		const response = await giftAPI.saveGiftLearner(params);
		console.log(response);
		if (response.status === "Success") {
			Notification(
				"success",
				"Receive gift success. Please wait us email for you."
			);
			emptyCart();
			getUserAction();
		} else {
			Notification("error", response.message);
		}
	};

	const msg = "(The number of points is not enough to redeem the gift)";

	return (
		<div style={{ maxWidth: "950px" }}>
			{point === 0 && (
				<Empty description="Cart is empty" style={{ margin: "20px 0" }} />
			)}
			{products.map((item) => {
				let count = 0;
				if (item.selected === true) {
					return (
						<Card
							size="small"
							title={<Text type="success">{item.name}</Text>}
							style={{ marginBottom: "15px", position: "relative" }}
						>
							<Descriptions size="small" style={{ maxWidth: "90%" }}>
								<Descriptions.Item label="Information" span={3}>
									<Text>{item.desc}</Text>
								</Descriptions.Item>
								<Descriptions.Item label="Quantity">
									<Tag color="#108ee9">{item.quantity}</Tag>
								</Descriptions.Item>
								<Descriptions.Item label="Total point">
									<Tag color="#2db7f5">{item.quantity * 600}</Tag>
								</Descriptions.Item>
								<Descriptions.Item label="In stock">
									<Tag color="#2db7f5">{item.max}</Tag>
								</Descriptions.Item>
							</Descriptions>
							<Space style={style}>
								<Button icon={<PlusOutlined />} onClick={() => add(item.id)} />
								<Button
									danger
									icon={<MinusOutlined />}
									onClick={() => sub(item.id)}
								/>
								<Button
									type="primary"
									danger
									icon={<DeleteOutlined />}
									onClick={() => remove(item.id)}
								/>
							</Space>
						</Card>
					);
				}
			})}
			{point !== 0 && (
				<>
					<Descriptions layout="vertical" bordered>
						<Descriptions.Item label="Checkout" span={3}>
							<Space
								style={{ display: "flex", justifyContent: "space-between" }}
							>
								<Space>
									<Text mark>Total point: </Text>
									<Text strong>{point}</Text>
									<Text type="warning">
										{currentUser?.point < point ? msg : ""}
									</Text>
								</Space>
								<Popconfirm
									title="Are you sure checkout?"
									okText="Yes"
									cancelText="No"
									onConfirm={() => onSubmit()}
								>
									<Button
										type="primary"
										danger
										disabled={currentUser?.point < point ? true : false}
									>
										Checkout
									</Button>
								</Popconfirm>
							</Space>
						</Descriptions.Item>
					</Descriptions>
					<Space style={{ padding: "10px 20px" }}>
						<Text>
							<QuestionCircleOutlined /> For in-kind <Text mark>products</Text>,
							we will confirm via email and send to you within a few weeks,
							please confirm receipt of email and update your correct address.
						</Text>
					</Space>
				</>
			)}
		</div>
	);
}
export default Cart;
