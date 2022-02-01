import { FileImageOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload, DatePicker, message } from "antd";
import Moment from "moment";
import Compressor from "compressorjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isShowAdsAdd } from "redux/actions/donor";
import firebase from "../../../../firebase";
import { v4 as uuidv4 } from "uuid";
import adsAPI from "apis/ads.api";
import Notification from "components/Notification";

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

const { RangePicker } = DatePicker;

function AddAds(props) {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { isAddAds } = useSelector((state) => state.donor);
	const [url, setUrl] = useState([]);

	const handleCancel = () => {
		dispatch(isShowAdsAdd(false));
	};

	const onFinish = async (values) => {
		const params = {
			title: values.title,
			content: values.content,
			imageLink: url,
			startDate: Moment(values.date[0]).format("YYYY-MM-DD h:mm:ss"),
			endDate: Moment(values.date[1]).format("YYYY-MM-DD h:mm:ss"),
		};
		const response = await adsAPI.addAds(params);
		if (response.status === "Success") {
			Notification("success", response.message);
			form.resetFields();
			props.pCallback();
			dispatch(isShowAdsAdd(false));
		} else {
			Notification("error", response.message);
		}
	};

	const fileCompress = (file) => {
		return new Promise((resolve, reject) => {
			new Compressor(file, {
				file: "File",
				quality: 0.5,
				maxWidth: 900,
				maxHeight: 900,
				success(file) {
					return resolve({
						success: true,
						file: file,
					});
				},
				error(err) {
					return resolve({
						success: false,
						message: err.message,
					});
				},
			});
		});
	};

	const uploader = {
		action: "",
		name: "file",
		multiple: false,
		beforeUpload: (file) => {
			const isJpgOrPng =
				file.type === "image/jpeg" || file.type === "image/png";
			if (!isJpgOrPng) {
				message.error("You can only upload JPG/PNG file!");
			}
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				message.error("Image must smaller than 2MB!");
			}
			return isJpgOrPng && isLt2M ? true : Upload.LIST_IGNORE;
		},
		customRequest(e) {
			setTimeout(() => {
				e.onSuccess();
			}, 2000);
		},
		onChange: async (info) => {
			const compressState = await fileCompress(info.fileList[0]?.originFileObj);
			if (compressState.success) {
				let fileName = uuidv4();
				let storage = firebase.storage().ref();
				storage
					.child(fileName)
					.put(compressState.file)
					.then((snapshot) => {
						return snapshot.ref.getDownloadURL();
					})
					.then((url) => {
						setUrl(url);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},
		progress: {
			strokeColor: {
				"0%": "#108ee9",
				"100%": "#87d068",
			},
			strokeWidth: 3,
			format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
		},
	};

	function disabledDate(current) {
		return Moment().add(-1, "days") >= current;
	}

	return (
		<Modal
			title="Add advertisement"
			visible={isAddAds}
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
					label="Banner"
					name="banner"
					rules={[
						{
							required: true,
							message: "Banner is required",
						},
					]}
				>
					<Upload
						{...uploader}
						maxCount={1}
						name="logo"
						listType="picture"
						required
					>
						<Button icon={<FileImageOutlined />}>Click to upload</Button>
					</Upload>
				</Form.Item>

				<Form.Item
					name="title"
					label="Title"
					rules={[
						{
							required: true,
							message: "Title is required",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="content"
					label="Information"
					rules={[
						{
							required: true,
							message: "Information is required",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Date"
					name="date"
					rules={[
						{
							required: true,
							message: "Date is required",
						},
					]}
				>
					<RangePicker
						disabledDate={disabledDate}
						showTime
						style={{ width: "100%" }}
					/>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
}
export default AddAds;
