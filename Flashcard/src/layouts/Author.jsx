import { Divider, Tree, Tag } from "antd";
import flashcardAPI from "apis/flashcard.api";
import lessionAPI from "apis/lession.api";
import subjectAPI from "apis/subject.api";
import topicAPI from "apis/topic.api";
import AddFlashcard from "components/Author/Add/AddFlashcard";
import AddLession from "components/Author/Add/AddLession";
import AddSubject from "components/Author/Add/AddSubject";
import AddTopic from "components/Author/Add/AddTopic";
import AddQuiz from "components/Author/Add/AddQuiz";
import ListQuiz from "components/Author/Quiz/ListQuiz";
import QuizDetail from "components/Author/Quiz/QuizDetail";
// card content
import Subject from "components/Author/Content/Subject";
import Topic from "components/Author/Content/Topic";
import Flashcard from "components/Author/Content/Flashcard";
import Lession from "components/Author/Content/Lession";
import Question from "components/Author/Content/Question";
import MenuCreater from "components/Author/Menu";
// modal update
import ModalUpdate from "components/Author/ModalUpdate";
import UpdateFlashcard from "components/Author/Update/UpdateFlashcard";
import UpdateLession from "components/Author/Update/UpdateLession";
import UpdateSubject from "components/Author/Update/UpdateSubject";
import { history } from "helpers/history";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	Link,
	Route,
	Switch,
	useLocation,
	useRouteMatch,
} from "react-router-dom";
import { changeModalUpdateVisible } from "redux/actions/status";
import "../assets/css/author_layout.css";
import Layout from "./Layout";

function AuthorLayout() {
	const dispatch = useDispatch();
	let { path } = useRouteMatch();
	let location = useLocation();
	const { DirectoryTree } = Tree;

	const [topics, setTopics] = useState();
	const [filterTopics, setFilterTopics] = useState();
	const [subjects, setSubjects] = useState();
	const [filterSubjects, setFilterSubjects] = useState();
	const [lessions, setLessions] = useState();
	const [filterLessions, setFilterLessions] = useState();
	const [flashcards, setFlashcards] = useState();
	const [filterFlashcards, setFilterFlashcards] = useState();
	// state update
	const [subject, setSubject] = useState();
	const setSubjectUpdate = (updateSubject) => {
		setSubject(updateSubject);
		dispatch(changeModalUpdateVisible(true));
	};
	const [lession, setLession] = useState();
	const setLessionUpdate = (updateLession) => {
		setLession(updateLession);
		dispatch(changeModalUpdateVisible(true));
	};
	const [flashcard, setFlashcard] = useState();
	const setFlashcardUpdate = (updateFlashcard) => {
		setFlashcard(updateFlashcard);
		dispatch(changeModalUpdateVisible(true));
	};

	const getData = async () => {
		try {
			const respTopic = await topicAPI.getTopicByMe();
			const respoSubject = await subjectAPI.getSubjectByMe();
			const respLession = await lessionAPI.getLessionByMe();
			const respFlashcard = await flashcardAPI.getFlashcardByMe();
			setTopics(respTopic.topics);
			setSubjects(respoSubject.listSubject);
			setLessions(respLession.listLession);
			setFlashcards(respFlashcard.listFlashcard);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const nodeList = [];

	function newNode() {
		if (topics && subjects && lessions && flashcards) {
			topics.map((topic) => {
				nodeList.push({
					title: topic.topicName,
					key: "subject?topicId=" + topic.topicId,
					children: newSubjectNode(topic.topicId, subjects),
				});
			});
		}
	}

	function newSubjectNode(id, subjects) {
		const subjectNode = [];
		subjects &&
			subjects.map((subject) => {
				if (id === subject.topicId) {
					subjectNode.push({
						title: subject.subjectName,
						key: "lession?subjectId=" + subject.subjectId,
						children: newLessionNode(subject.subjectId, lessions),
					});
				}
			});
		return subjectNode;
	}

	function newLessionNode(id, lessions) {
		const lessionNode = [];
		lessions &&
			lessions.map((lession) => {
				if (id === lession.subjectId) {
					lessionNode.push({
						title: lession.lessionName,
						key: "flashcard?lessionId=" + lession.lessionId,
						children: newFlashcardNode(lession.lessionId, flashcards),
					});
				}
			});
		return lessionNode;
	}

	function newFlashcardNode(id, flashcards) {
		const flashNode = [];
		flashcards &&
			flashcards.map((flashcard) => {
				if (id === flashcard.lessionId) {
					flashNode.push({
						title: flashcard.flashcardName,
						key: "question?flashcardId=" + flashcard.flashcardId,
					});
				}
			});
		return flashNode;
	}

	newNode();

	const onSelect = (keys) => {
		history.push("/author/" + keys);
	};

	const searchTopic = (string) => {
		if (string.length === 0) {
			return setFilterTopics(topics);
		}
		let searchLower = string.toLowerCase();
		let filtered = topics.filter((item) => {
			if (item.topicName.toLowerCase().includes(searchLower)) {
				return true;
			}
			return false;
		});
		return setFilterTopics(filtered);
	};
	const searchSubject = (string) => {
		if (string.length === 0) {
			return setFilterSubjects(subjects);
		}
		let searchLower = string.toLowerCase();
		let filtered = subjects.filter((item) => {
			if (item.subjectName.toLowerCase().includes(searchLower)) {
				return true;
			}
			return false;
		});
		return setFilterSubjects(filtered);
	};
	const searchLession = (string) => {
		if (string.length === 0) {
			return setFilterLessions(lessions);
		}
		let searchLower = string.toLowerCase();
		let filtered = lessions.filter((item) => {
			if (item.lessionName.toLowerCase().includes(searchLower)) {
				return true;
			}
			return false;
		});
		return setFilterLessions(filtered);
	};
	const searchFlashcard = (string) => {
		if (string.length === 0) {
			return setFilterFlashcards(flashcards);
		}
		let searchLower = string.toLowerCase();
		let filtered = flashcards.filter((item) => {
			if (item.flashcardName.toLowerCase().includes(searchLower)) {
				return true;
			}
			return false;
		});
		return setFilterFlashcards(filtered);
	};

	return (
		<Layout>
			<div className="author-wrap">
				<div className="author-menu">
					<div className="author-menu__list">
						<div className="author-menu__list-tree">
							<label htmlFor="" className="author-menu__list-tree-title">
								<Link to="/author">
									<Tag color="#108ee9">ROOT DIRECTORY</Tag>
								</Link>
							</label>
							<DirectoryTree
								className="tree-style"
								onSelect={onSelect}
								treeData={nodeList}
								style={{ paddingBottom: 20 }}
							/>
						</div>
					</div>
				</div>
				<div className="author-content">
					<div className="author-content__wrap">
						<Divider orientation="left" style={{ fontWeight: 300 }}>
							{location.pathname.length > 8
								? location.pathname.substring(8).toUpperCase()
								: "TOPIC"}
						</Divider>
						<Switch>
							<Route exact path={path}>
								<MenuCreater parentCallback={searchTopic}>
									<AddTopic parentCallback={getData} />
								</MenuCreater>
								<Topic
									topics={!filterTopics ? topics : filterTopics}
									parentCallback={getData}
								/>
							</Route>
							<Route path={`${path}/subject`}>
								<MenuCreater parentCallback={searchSubject}>
									<AddSubject parentCallback={getData} />
								</MenuCreater>
								<ModalUpdate title={"Update subject"}>
									<UpdateSubject subject={subject} parentCallback={getData} />
								</ModalUpdate>
								<Subject
									subjects={!filterSubjects ? subjects : filterSubjects}
									parentCallback={getData}
									setSubjectUpdate={setSubjectUpdate}
								/>
							</Route>
							<Route path={`${path}/lession`}>
								<MenuCreater parentCallback={searchLession}>
									<AddLession parentCallback={getData} />
								</MenuCreater>
								<ModalUpdate title={"Update lession"}>
									<UpdateLession lession={lession} parentCallback={getData} />
								</ModalUpdate>
								<Lession
									lessions={!filterLessions ? lessions : filterLessions}
									parentCallback={getData}
									setLessionUpdate={setLessionUpdate}
								/>
							</Route>
							<Route path={`${path}/flashcard`}>
								<MenuCreater parentCallback={searchFlashcard}>
									<AddFlashcard parentCallback={getData} />
								</MenuCreater>
								<ModalUpdate title={"Update flashcard"}>
									<UpdateFlashcard
										flashcard={flashcard}
										parentCallback={getData}
									/>
								</ModalUpdate>
								<Flashcard
									flashcards={!filterFlashcards ? flashcards : filterFlashcards}
									parentCallback={getData}
									setFlashcardUpdate={setFlashcardUpdate}
								/>
							</Route>
							<Route path={`${path}/question`}>
								<Question />
							</Route>
							<Route path={`${path}/add-quiz`}>
								<AddQuiz />
							</Route>
							<Route path={`${path}/view-quiz`}>
								<ListQuiz />
							</Route>
							<Route path={`${path}/quiz-detail`}>
								<QuizDetail />
							</Route>
						</Switch>
					</div>
				</div>
				<div className="author-adv"></div>
			</div>
		</Layout>
	);
}
export default AuthorLayout;
