import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { wrapper } from "../store";

import axiosInstance from "../common/customAxios";

import { changeNickname, getUserInfo } from "../store/thunk/userThunk";

import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getUserPostList } from "../store/thunk/postThunk";
import PostCard from "../components/post/PostCard";
import { getUserPerfumeList } from "../store/thunk/perfumeThunk";
import CardList from "../components/perfume/CardList";
import { getUserReviewList } from "../store/thunk/reviewThunk";
import ReviewModifyForm from "../components/detail/ReviewModifyForm";

const Mypage = () => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.user.userInfo?.userInfo);
	const userPostList = useSelector((state) => state.post.userPostList);
	const userReviewList = useSelector((state) => state.review.list);
	const { changeNicknameDone, changeNicknameError } = useSelector(
		(state) => state.user,
	);
	const perfumeList = useSelector((state) => state.perfume.list.rows);
	const perfumeListLoading = useSelector((state) => state.perfume.isLoading);
	const perfumeCount = useSelector((state) => state.perfume.list.count);

	const [nicknameState, setNicknameState] = useState(userInfo?.nickname);
	const [navState, setNavState] = useState("basic");


	const navClickHandler = (key) => {
		setNavState(key);
	};

	useEffect(() => {
		if (!(userInfo && userInfo.id)) {
			Router.push("/login");
		}
	}, [userInfo && userInfo.id]);

	useEffect(() => {
		if (changeNicknameDone) {
			alert("succeed");
		} else if (changeNicknameError) {
			alert(changeNicknameError);
		}
	}, [changeNicknameDone, changeNicknameError]);

	useEffect(() => {
		if (navState === "feed") {
			dispatch(getUserPostList({ userId: userInfo.id }));
		} else if (navState === "like") {
			dispatch(getUserPerfumeList({ userId: userInfo.id }));
		} else if (navState === "review") {
			dispatch(getUserReviewList({ userId: userInfo.id }));
		}
	}, [navState]);

	const onNicknameHandler = (e) => {
		e.preventDefault();
		if (userInfo.nickname === nicknameState) {
			return alert("same nickname");
		}

		if (confirm("want to change nickname?")) {
			dispatch(changeNickname({ nickname: nicknameState }));
		}
	};

	return (
		<>
			<Nav fill variant="tabs" defaultActiveKey="basic">
				<Nav.Item>
					<Nav.Link
						eventKey="basic"
						onClick={() => {
							navClickHandler("basic");
						}}
					>
						Basic Info
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						eventKey="like"
						onClick={() => {
							navClickHandler("like");
						}}
					>
						Like List
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						eventKey="feed"
						onClick={() => {
							navClickHandler("feed");
						}}
					>
						Feed List
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						eventKey="review"
						onClick={() => {
							navClickHandler("review");
						}}
					>
						Review List
					</Nav.Link>
				</Nav.Item>
			</Nav>
			<div className="d-flex flex-wrap justify-content-center">
				{navState === "basic" && (
					<>
						<Form
							style={{ width: "80%", marginTop: "3rem" }}
							onSubmit={onNicknameHandler}
						>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" value={userInfo?.email} disabled />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Register</Form.Label>
								<Form.Control
									type="input"
									value={userInfo?.createdAt?.slice(0, 19).replace("T", " ")}
									disabled
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Nickname</Form.Label>
								<Form.Control
									type="input"
									value={nicknameState}
									onChange={(e) => {
										setNicknameState(e.target.value);
									}}
								/>
							</Form.Group>
							<Button variant="primary" type="submit" style={{ width: "100%" }}>
								Submit
							</Button>
						</Form>
					</>
				)}
				{navState === "feed" && (
					<>
						{userPostList &&
							userPostList.map((post) => (
								<PostCard key={post.id} post={post} />
							))}
					</>
				)}
				{navState === "like" && (
					<>
						{perfumeList && (
							<CardList
								perfumeList={perfumeList}
								perfumeCount={perfumeCount}
								perfumeListLoading={perfumeListLoading}
							/>
						)}
					</>
				)}
				{navState === "review" && (
					<>
						{userReviewList &&
							userReviewList.map((review) => (
								<ReviewModifyForm review={review} key={review.id} />
							))}
					</>
				)}
			</div>
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		const cookie = context.req ? context.req.headers.cookie : "";
		axiosInstance.defaults.headers.Cookie = "";
		if (context.req && cookie) {
			axiosInstance.defaults.headers.Cookie = cookie;
			await store.dispatch(getUserInfo());
		}
	},
);

export default Mypage;
