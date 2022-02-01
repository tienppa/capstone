import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import RelatedQuiz from "components/Quiz/RelatedQuiz";
import ReviewBasic from "components/Quiz/ReviewQuiz/ReviewBasic";
import ReviewDetail from "components/Quiz/ReviewQuiz/ReviewDetail";
import ReviewList from "components/Quiz/ReviewQuiz/ReviewList";
import StartQuiz from "components/Quiz/StartQuiz";
import TakeQuiz from "components/Quiz/TakeQuiz";
import { useEffect } from "react";
import {
	Link,
	Route,
	Switch,
	useLocation,
	useRouteMatch,
} from "react-router-dom";
import "../assets/css/quiz_layout.css";
import Layout from "./Layout";

const { SubMenu } = Menu;
let id = 0;

function QuizLayout() {
	let { path } = useRouteMatch();
	let { search } = useLocation();
	let query = new URLSearchParams(search);
	const subjectId = query.get("subjectId");

	useEffect(() => {
		id = subjectId;
	}, [subjectId]);

	return (
		<Layout>
			<div className="quiz-layout__container">
				<div className="quiz-layout__menu">
					<Menu
						defaultSelectedKeys={["suggest"]}
						defaultOpenKeys={["suggest"]}
						mode="inline"
					>
						<SubMenu key="suggest" icon={<AppstoreOutlined />} title="Suggest">
							<Menu.Item key="subject">
								<Link to="/latest">Subject</Link>
							</Menu.Item>
							<Menu.Item disabled key="lesson">
								Lesson
							</Menu.Item>
							<Menu.Item disabled key="flashcard">
								Flashcard
							</Menu.Item>
						</SubMenu>
					</Menu>
				</div>
				<div className="quiz-layout__content">
					<Switch>
						<Route exact path={`${path}`}>
							<StartQuiz />
						</Route>
						<Route path={`${path}/related-quiz`}>
							<RelatedQuiz />
						</Route>
						<Route path={`${path}/take-quiz`}>
							<TakeQuiz />
						</Route>
						<Route path={`${path}/review`}>
							<ReviewBasic />
						</Route>
						<Route path={`${path}/review-detail`}>
							<ReviewDetail />
						</Route>
						<Route path={`${path}/history`}>
							<ReviewList />
						</Route>
					</Switch>
				</div>
			</div>
		</Layout>
	);
}
export default QuizLayout;
