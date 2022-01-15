import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { wrapper } from "../store";

import { getUserInfo } from "../store/thunk/userThunk";
import { addPost, getPostList } from "../store/thunk/postThunk";

import axiosInstance from "../common/customAxios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PostCard from "../components/post/PostCard";


const Feed = () => {
	const dispatch = useDispatch();
	const content = useRef();
	const userInfo = useSelector((state) => state.user.userInfo?.userInfo);
	const { postList, hasMorePosts } = useSelector((state) => state.post);

	const loadMoreHandler = () => {
		const lastId = postList[postList.length - 1]?.id;
		dispatch(getPostList({ lastId }));
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (!(userInfo && userInfo.id)) {
			return alert("need login");
		}
		if (content && content.current.value.trim().length < 11) {
			alert("feed need to be more than 10 letters");
			return;
		}

		dispatch(
			addPost({
				UserId: userInfo.id,
				content: content.current.value.trim(),
			}),
		).then((content.current.value = null));
	};

	return (
		<div
			className="d-flex flex-column align-items-center"
			onSubmit={submitHandler}
		>
			<Form className="mb-3" style={{ width: "80%" }}>
				<Form.Group>
					{/* <Form.Label>share your story</Form.Label> */}
					<Form.Control
						as="textarea"
						rows="5"
						ref={content}
						maxLength={3000}
						required
						placeholder="What's happening?"
						style={{ resize: "none" }}
					/>
					<div style={{ float: "right", marginTop: "0.1rem" }}>
						<button type="submit" className="btn btn-primary">
							woof
						</button>
					</div>
				</Form.Group>
			</Form>
			<div
				className="d-flex flex-column align-items-center"
				style={{ width: "100%" }}
			>
				{postList &&
					postList.map((post) => <PostCard key={post.id} post={post} />)}
			</div>
			<div style={{ justifyContent: "center" }}>
				{hasMorePosts && (
					<Button variant="dark" onClick={loadMoreHandler}>
						Sniff More
					</Button>
				)}
				{!hasMorePosts && (
					<Button variant="dark" onClick={loadMoreHandler} disabled>
						Sniff More
					</Button>
				)}
			</div>
		</div>
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

		await store.dispatch(getPostList());
	},
);

export default Feed;
