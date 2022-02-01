import { ShoppingCartOutlined } from "@ant-design/icons";
import {
	Avatar,
	Badge,
	Button,
	Card,
	Col,
	Descriptions,
	Row,
	Space,
	Spin,
	Tooltip,
	Typography,
	message,
} from "antd";
import giftAPI from "apis/gift.api";
import images from "constants/images";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addQuantity, addToCart, addToProducts } from "redux/actions/cart";
import "./index.css";

const { Text, Paragraph } = Typography;

function ListGift() {
	const history = useHistory();
	const [gifts, setGifts] = useState([]);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const { products } = useSelector((state) => state.cart);
	const [count, setCount] = useState(0);

	useEffect(() => {
		const getGift = async () => {
			const response = await giftAPI.getGifts();
			if (response.status === "Success") {
				setGifts(response.listServices);
				addAll(response.listServices);
			} else {
				console.log(response.message);
			}
			setLoading(false);
		};
		getGift();
	}, []);

	useEffect(() => {
		const getCount = () => {
			let count = 0;
			products.map((item) => {
				if (item.selected === true) {
					count = count + item.quantity;
				}
			});
			return count;
		};
		setCount(getCount());
	}, [products]);

	const addAll = (values) => {
		let product = [];
		values?.map((item) => {
			product.push({
				id: item.id,
				name: item.serviceName,
				desc: item.serviceInformation,
				max: item.quantity,
				price: 600,
				quantity: 1,
				selected: false,
			});
		});
		dispatch(addToProducts(product));
	};

	const addCart = (id) => {
		let item = products.find((element) => {
			if (element.id === id && element.selected === true) {
				return true;
			}
		});
		console.log(item);
		if (item) {
			if (item.quantity < item.max) {
				message.success("Add gift success.");
				dispatch(addQuantity(id));
			} else {
				message.warning("Out of stock.");
			}
		} else {
			dispatch(addToCart(id));
		}
	};

	return (
		<>
			<Spin tip="Loading..." spinning={loading}>
				<Space
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "15px",
					}}
				>
					<Button type="text"></Button>
					<Badge count={count} showZero style={{ color: "#fff" }}>
						<Avatar
							style={{ cursor: "pointer" }}
							shape="circle"
							size="default"
							icon={<ShoppingCartOutlined />}
							onClick={() => {
								history.push("/gift/cart");
							}}
						/>
					</Badge>
				</Space>
				<Row gutter={[10, 24]}>
					{gifts?.map((gift) => {
						return (
							<Col xs={12} lg={8} xl={8} xxl={6} key={gift.id}>
								<Card
									hoverable
									style={{ borderRadius: "6px" }}
									cover={
										<img
											alt="example"
											src={
												(gift?.serviceTypeId === 1 && images.VOUCHER_IMG) ||
												(gift?.serviceTypeId === 2 && images.DISCOUNT_IMG) ||
												(gift?.serviceTypeId === 3 && images.GIFT_IMG)
											}
											style={{ height: "120px" }}
										/>
									}
									actions={[
										<Tooltip title="Add to cart" key="add">
											<Button
												icon={<ShoppingCartOutlined />}
												type="text"
												onClick={() => addCart(gift.id)}
											/>
										</Tooltip>,
									]}
								>
									<Descriptions>
										<Descriptions.Item span={3}>
											<Text strong>{gift.serviceName}</Text>
										</Descriptions.Item>
										<Descriptions.Item
											span={3}
											style={{ paddingBottom: "5px" }}
										>
											<Paragraph
												style={{ margin: 0, height: "50px" }}
												ellipsis={{
													rows: 2,
													expandable: false,
												}}
												tooltip={gift.serviceInformation}
												title={`${gift.serviceInformation}`}
											>
												{gift.serviceInformation}
											</Paragraph>
										</Descriptions.Item>
										<Descriptions.Item
											span={3}
											style={{ paddingBottom: "5px" }}
										>
											<Text>Quantity: {gift.quantity}</Text>
										</Descriptions.Item>
									</Descriptions>
									<div>
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
											}}
										>
											<div>Start</div>
											<div>{Moment(gift.startDate).format("YYYY-MM-DD")}</div>
										</div>
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
											}}
										>
											<div>End</div>
											<div>{Moment(gift.endDate).format("YYYY-MM-DD")}</div>
										</div>
									</div>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Spin>
		</>
	);
}
export default ListGift;
