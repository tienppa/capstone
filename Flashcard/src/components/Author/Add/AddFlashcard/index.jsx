import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button, Form, Input, Radio } from "antd";
import flashcardAPI from "apis/flashcard.api";
import MyUploadAdapter from "components/Editor";
import Notification from "components/Notification";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setFlashcardContent } from "redux/actions/author";
import { changeModalVisible } from "redux/actions/status";

const layout = {
	labelCol: {
		span: 4,
	},
	wrapperCol: {
		span: 18,
	},
};

function AddFlashcard(props) {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	let { search } = useLocation();
	let query = new URLSearchParams(search);
	const lessionId = query.get("lessionId");

	const { flashContent } = useSelector((state) => state.author);

	const refresh = () => {
		props.parentCallback();
	};

	const onFinish = async (values) => {
		if (!values || !flashContent) return;
		try {
			let newValues = Object.assign(
				{ lessionId: lessionId, flashcardContent: flashContent },
				values
			);
			const response = await flashcardAPI.addFlashcardByLessionId(newValues);
			console.log(response);
			if (response.status === "Success") {
				Notification("success", response.message);
				refresh();
				form.resetFields();
				dispatch(changeModalVisible(false));
				dispatch(setFlashcardContent(""));
			} else {
				Notification("error", response.message);
			}
		} catch (error) {
			console.log("Create flashcard", error.message);
		}
	};

	return (
		<div className="creater-container">
			<Form {...layout} form={form} name="nest-messages" onFinish={onFinish}>
				<Form.Item
					name="flashcardName"
					label="Flashcard name:"
					rules={[
						{
							required: true,
							message: "Please input your subject",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item label="Flashcard content:">
					<CKEditor
						data={flashContent}
						editor={ClassicEditor}
						onReady={(editor) => {
							editor.plugins.get("FileRepository").createUploadAdapter = (
								loader
							) => {
								return new MyUploadAdapter(loader);
							};
						}}
						onChange={(event, editor) => {
							const data = editor.getData();
							dispatch(setFlashcardContent(data));
						}}
					/>
				</Form.Item>
				{/* <Form.Item name="statusId" label="Status:" initialValue={1}>
					<Radio.Group style={{ width: 40 }}>
						<Radio value={1}>Public</Radio>
						<Radio value={2}>Private</Radio>
					</Radio.Group>
				</Form.Item> */}
				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
					<Button type="primary" htmlType="submit">
						Add Flashcard
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
export default AddFlashcard;
