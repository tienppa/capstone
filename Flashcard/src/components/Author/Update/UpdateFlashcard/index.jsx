import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button, Form, Input, Radio } from "antd";
import flashcardAPI from "apis/flashcard.api";
import MyUploadAdapter from "components/Editor";
import Notification from "components/Notification";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeModalUpdateVisible } from "redux/actions/status";

const layout = {
	labelCol: {
		span: 4,
	},
	wrapperCol: {
		span: 18,
	},
};

function UpdateFlashcard(props) {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { flashcard } = props;

	const [content, setContent] = useState("");

	useEffect(() => {
		form.resetFields();
	}, [flashcard]);

	const refresh = () => {
		props.parentCallback();
	};

	const onFinish = async (values) => {
		if (values) {
			Object.assign(values, {
				flashcardId: flashcard.flashcardId,
				flashcardContent: content,
			});
			console.log(values);
			updateFlashcard(values);
		}
	};

	const updateFlashcard = async (flashcard) => {
		const response = await flashcardAPI.updateFlashcardByFlashcardId(flashcard);
		if (response.status === "Success") {
			Notification("success", response.message);
			dispatch(changeModalUpdateVisible(false));
			refresh();
			form.resetFields();
		} else {
			Notification("error", response.message);
		}
	};

	return (
		<div className="creater-container">
			<Form
				{...layout}
				form={form}
				name="nest-messages"
				initialValues={flashcard}
				onFinish={onFinish}
			>
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
				<Form.Item
					label="Flashcard content:"
					rules={[
						{
							required: true,
							message: "Please input flashcard content",
						},
					]}
				>
					<CKEditor
						data={flashcard.flashcardContent}
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
							setContent(data);
						}}
						onBlur={(event, editor) => {
							console.log("Blur.", editor);
						}}
						onFocus={(event, editor) => {
							console.log("Focus.", editor);
						}}
					/>
				</Form.Item>
				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
					<Button type="primary" htmlType="submit">
						Update Flashcard
					</Button>
					<Button
						style={{ margin: "0 8px" }}
						onClick={() => {
							form.resetFields();
						}}
					>
						Reset
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
export default UpdateFlashcard;
