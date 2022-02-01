import searchAPI from "apis/search.api";
import Pagi from "components/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
	saveLessionByFlashcard,
	saveSubjectBySubject,
} from "redux/actions/latest";
import LSearch from "./LSearch";
import SSearch from "./SSearch";

function SearchLatest() {
	const dispatch = useDispatch();
	const searchType = useSelector((state) => state.latest.searchType);
	let location = useLocation();
	let query = new URLSearchParams(location.search);
	let searchKey = query.get("key");
	const [total, setTotal] = useState(1);

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(10);
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;

	const searchSubject = async () => {
		const response = await searchAPI.searchSubject({
			searchValue: searchKey,
		});
		if (response.status === "Success") {
			return response.searchResult;
		} else {
			return [];
		}
	};
	const searchSubjectByLession = async () => {
		const response = await searchAPI.searchSubjectByLession({
			searchValue: searchKey,
		});
		if (response.status === "Success") {
			return response.searchResult;
		} else {
			return [];
		}
	};
	const searchFlashcard = async () => {
		const response = await searchAPI.searchFlashcardReturnLession({
			searchValue: searchKey,
		});
		if (response.status === "Success") {
			return response.data;
		} else {
			return [];
		}
	};

	useEffect(() => {
		const searchFn = async () => {
			switch (searchType) {
				case "lession": {
					const subjectFound = await searchSubjectByLession();
					dispatch(saveSubjectBySubject(subjectFound));
					break;
				}
				case "flashcard": {
					const lessionFound = await searchFlashcard();
					dispatch(saveLessionByFlashcard(lessionFound));
					break;
				}
				default:
					const subjectFound = await searchSubject();
					dispatch(saveSubjectBySubject(subjectFound));
			}
		};
		searchFn();
	}, [searchKey, searchType]);

	const pSetTotal = (num) => {
		setTotal(num);
	};

	function onShowSizeChange(current, pageSize) {
		setCurrentPage(current);
		setPostsPerPage(pageSize);
	}

	function onChange(pageNumber) {
		setCurrentPage(pageNumber);
	}
	return (
		<div style={{ padding: "20px" }}>
			{searchType === "subject" && (
				<SSearch
					pCallback={pSetTotal}
					indexOfLastPost={indexOfLastPost}
					indexOfFirstPost={indexOfFirstPost}
				/>
			)}
			{searchType === "lession" && (
				<SSearch
					pCallback={pSetTotal}
					indexOfLastPost={indexOfLastPost}
					indexOfFirstPost={indexOfFirstPost}
				/>
			)}
			{searchType === "flashcard" && (
				<LSearch
					pCallback={pSetTotal}
					indexOfLastPost={indexOfLastPost}
					indexOfFirstPost={indexOfFirstPost}
				/>
			)}
			<Pagi
				parentSizeChange={onShowSizeChange}
				parentPageChange={onChange}
				total={total}
			/>
		</div>
	);
}
export default SearchLatest;
