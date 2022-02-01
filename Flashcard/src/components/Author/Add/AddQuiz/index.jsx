import { Steps, Button } from "antd";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./index.css";
import QuizName from "./QuizName";
import ListQuestion from "./ListQuestion";
import ReviewQuiz from "./ReviewQuiz";
import Notification from "components/Notification";
import quizAPI from "apis/quiz.api";

const steps = [
	{
		title: "Set name of quiz.",
	},
	{
		title: "Choose questions.",
	},
	{
		title: "Review and Submit.",
	},
];

const { Step } = Steps;

function AddQuiz() {
	const history = useHistory();
	const [current, setCurrent] = useState(0);
	const [lessionArr, setLessionArr] = useState([]);
	const [checkAll, setCheckAll] = useState(false);
	let { search } = useLocation();
	let query = new URLSearchParams(search);
	const subjectId = query.get("subjectId");

	const [one, setOne] = useState([]);
	const [two, setTwo] = useState([]);
	const [three, setThree] = useState([]);

	const parrentSetOne = (values) => {
		setOne(values);
	};
	const parrentSetTwo = (values) => {
		setTwo(values);
	};
	const parentSetCheckAll = (values) => {
		setCheckAll(values);
	};
	const parrentSetThree = (values) => {
		setThree(values);
	};

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	const setLessionArray = (array) => {
		setLessionArr(array);
	};

	const addQuiz = async () => {
		const params = {
			subjectId: parseInt(subjectId),
			testName: one.testName,
			lessionArr: lessionArr,
			questionArr: two,
		};
		const response = await quizAPI.addQuiz(params);
		if (response.status === "Success") {
			Notification("success", response.message);
			history.push(`/author/lession?subjectId=${subjectId}`);
		} else {
			Notification("error", response.message);
		}
	};

	return (
		<div className="add-quiz__container">
			<div className="add-quiz__step">
				<Steps size="small" current={current} responsive>
					{steps.map((item) => (
						<Step key={item.title} title={item.title} />
					))}
				</Steps>
			</div>
			<div className="add-quiz__main">
				{current === 0 && (
					<QuizName
						subjectId={subjectId}
						parentNext={next}
						one={one}
						parrentSetOne={parrentSetOne}
						parentSetLessionArray={setLessionArray}
					/>
				)}
				{current === 1 && (
					<ListQuestion
						lessionArr={lessionArr}
						two={two}
						parrentSetTwo={parrentSetTwo}
						parentNext={next}
						parentPrev={prev}
						checkAll={checkAll}
						parentSetCheckAll={parentSetCheckAll}
						parrentSetThree={parrentSetThree}
					/>
				)}
				{current === 2 && (
					<>
						<ReviewQuiz three={three} />
						<Button
							onClick={() => {
								prev();
							}}
							style={{ marginRight: 15 }}
						>
							Previous step
						</Button>

						<Button
							type="primary"
							onClick={() => {
								addQuiz();
							}}
						>
							Add Quiz
						</Button>
					</>
				)}
			</div>
		</div>
	);
}
export default AddQuiz;
