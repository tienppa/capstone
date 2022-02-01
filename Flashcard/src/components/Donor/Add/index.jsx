import {
	Button,
	Form,
	Input,
	Modal,
	Select,
	Space,
	DatePicker,
	Tooltip,
} from "antd";
import {
	MinusCircleOutlined,
	PlusOutlined,
	QuestionCircleOutlined,
} from "@ant-design/icons";
import donorAPI from "apis/donor.api";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isShowAdd } from "redux/actions/donor";
import Moment from "moment";
import Notification from "components/Notification";
import "./index.css";

const { Option } = Select;
const layout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 16,
	},
};
const tailLayout = {
	wrapperCol: {
		xs: { span: 24, offset: 0 },
		sm: { span: 16, offset: 6 },
	},
};

const text =
	"For the gift-giving service, there is no need to fill in the gift information." +
	" Gifts will be updated and notified to you by us when received, we are responsible for distributing to the recipient and notifying you at that time.";

function Add(props) {
	const [form] = Form.useForm();
	const { isAdd } = useSelector((state) => state.donor);
	const dispatch = useDispatch();
	const [types, setTypes] = useState([]);
	const [hidden, setHidden] = useState(false);
	const [start, setStart] = useState(null);

	useEffect(() => {
		const getServiceType = async () => {
			const response = await donorAPI.getServiceType();
			if (response.status === "Success") {
				setTypes(response.types);
			} else {
				console.log(response.message);
			}
		};
		getServiceType();
	}, []);

	function onChange(value) {
		if (value === 1 || value === 2) {
			setHidden(true);
		} else {
			setHidden(false);
		}
	}

	const handleCancel = () => {
		dispatch(isShowAdd(false));
	};

	const format = (values) => {
		if (!values) return [];
		const array = [];
		values.map((item) => {
			array.push({
				serviceContent: item.serviceContent,
				startDate: Moment(item.startDate).format("YYYY-MM-DD"),
				endDate: Moment(item.endDate).format("YYYY-MM-DD"),
			});
		});
		return array;
	};

	const onReset = () => {
		form.resetFields();
	};

	function disabledDate(current) {
		return Moment().add(-1, "days") >= current;
	}

	function disabledDate2(current) {
		return current <= Moment(start).add(1, "days");
	}

	const onFinish = async (values) => {
		const params = {
			serviceTypeId: values.serviceTypeId,
			serviceName: values.serviceName,
			serviceInformation: values.serviceInformation,
			quantity: parseInt(hidden ? values.detail?.length : values.quantity),
			detail: format(values?.detail),
		};
		const response = await donorAPI.addService(params);
		if (response.status === "Success") {
			Notification("success", response.message);
			onReset();
			handleCancel();
			props.pCallback();
		} else {
			Notification("error", response.message);
		}
	};

	return (
		<Modal
			title="Add service"
			visible={isAdd}
			onCancel={handleCancel}
			width={900}
			footer={false}
		>
			<Form
				{...layout}
				name="control-hooks"
				onFinish={onFinish}
				autoComplete="off"
				form={form}
			>
				<Form.Item
					name="serviceName"
					label="Name"
					rules={[
						{
							required: true,
							message: "Name is required",
						},
					]}
				>
					<Input placeholder="Name of service." />
				</Form.Item>
				<Form.Item
					name="serviceInformation"
					label="Information"
					rules={[
						{
							required: true,
							message: "Information is required",
						},
					]}
				>
					<Input placeholder="Information of service." />
				</Form.Item>
				<Form.Item
					name="serviceTypeId"
					label="Type"
					rules={[
						{
							required: true,
							message: "Service Type is required",
						},
					]}
				>
					<Select placeholder="Type of service." allowClear onChange={onChange}>
						{types?.map((item) => {
							return (
								<Option key={item.id} value={item.id}>
									{item.typeName}
								</Option>
							);
						})}
					</Select>
				</Form.Item>

				{!hidden && (
					<Form.Item
						name="quantity"
						label="Quantity"
						hidden={hidden}
						rules={[
							{
								required: true,
								message: "Quantity is required",
							},
						]}
					>
						<Input type="number" min={0} placeholder="Quantity of gift." />
					</Form.Item>
				)}
				{hidden && (
					<Form.List
						name="detail"
						rules={[
							{
								validator: async (_, detail) => {
									if (!detail || detail.length < 1) {
										return Promise.reject(new Error("At least 1 gift."));
									}
								},
							},
						]}
					>
						{(fields, { add, remove }, { errors }) => (
							<>
								{fields.map(({ key, name, fieldKey }, index) => (
									<Form.Item
										{...(index === 0 ? layout : tailLayout)}
										required={false}
										key={key}
										label={index === 0 ? "Gift" : ""}
									>
										<Space
											style={{ display: "flex", marginBottom: 8 }}
											align="baseline"
										>
											<Form.Item
												noStyle
												name={[name, "serviceContent"]}
												fieldKey={[fieldKey, "Content"]}
												rules={[{ required: true, message: "Missing Content" }]}
											>
												<Input placeholder="Content" />
											</Form.Item>
											<Form.Item
												noStyle
												name={[name, "startDate"]}
												fieldKey={[fieldKey, "Start"]}
												rules={[
													{ required: true, message: "Missing date of start" },
												]}
											>
												<DatePicker
													format="YYYY-MM-DD"
													placeholder="Time start"
													disabledDate={disabledDate}
													onChange={(dateString) => setStart(dateString)}
												/>
											</Form.Item>
											<Form.Item
												noStyle
												name={[name, "endDate"]}
												fieldKey={[fieldKey, "End"]}
												rules={[
													{ required: true, message: "Missing date of end" },
												]}
											>
												<DatePicker
													format="YYYY-MM-DD"
													placeholder="Time end"
													disabled={start ? false : true}
													disabledDate={disabledDate2}
												/>
											</Form.Item>
											<MinusCircleOutlined
												className="dynamic-delete-button"
												onClick={() => remove(name)}
											/>
										</Space>
									</Form.Item>
								))}
								<Form.Item {...tailLayout}>
									<Button
										type="dashed"
										onClick={() => add()}
										block
										icon={<PlusOutlined />}
									>
										Add gift
									</Button>
									<Form.ErrorList errors={errors} />
								</Form.Item>
							</>
						)}
					</Form.List>
				)}

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
					<Tooltip title={text}>
						<Button icon={<QuestionCircleOutlined />} type="text"></Button>
					</Tooltip>
				</Form.Item>
			</Form>
		</Modal>
	);
}
export default Add;
