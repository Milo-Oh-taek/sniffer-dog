import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

import { addComment, deletePost } from "../../store/thunk/postThunk";

const PostCard = ({ post }) => {
	const dispatch = useDispatch();
	const content = useRef();
	const id = useSelector((state) => state.user.userInfo?.userInfo?.id);
	const [commentFormOpened, setCommentFormOpened] = useState(false);
	const [commentState, setCommentState] = useState(null);
	const onToggleComment = () => {
		setCommentFormOpened((prev) => !prev);
	};

	const submitHandler = () => {
		if (!id) return alert("need to log in");
		if (!post.id) return alert("error");

		dispatch(
			addComment({
				UserId: id,
				PostId: post.id,
				content: commentState,
			}),
		).then(setCommentState(""));
	};

	const onDeleteHandler = (postId) => {
		if(confirm('wanna delete this post?')){
			dispatch(deletePost({postId}));
		}
	}

	return (
		<Card style={{ width: "60%", margin: "1rem 0" }} key={post.id}>
			<Card.Header>
				{post.User.nickname}
				<span style={{ float: "right", fontSize: "0.5rem" }}>
					{post.createdAt.slice(0, 19).replace("T", " ")}
					{post.UserId === id && (
						<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-trash"
						viewBox="0 0 16 16"
						style={{cursor:'pointer'}}
						onClick={() => onDeleteHandler(post.id)}
					>
						<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
						<path
							fillRule="evenodd"
							d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
						/>
					</svg>
					)}
					
				</span>
			</Card.Header>

			<Card.Body>
				<Card.Text>{post.content}</Card.Text>
			</Card.Body>
			<button
				type="button"
				className="btn btn-outline-light"
				onClick={onToggleComment}
			>
				<Badge bg="light" text="dark">
					{post.Comments?.length}
				</Badge>
				<svg
					style={{ color: "black" }}
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="bi bi-chat-dots-fill"
					viewBox="0 0 16 16"
				>
					<path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
				</svg>
			</button>
			{commentFormOpened && (
				<>
					<ListGroup as="ul">
						{post.Comments?.map((com) => (
							<ListGroup.Item
								as="li"
								key={com.id}
								className="d-flex justify-content-between align-items-start"
							>
								<div className="ms-2 me-auto">
									<div className="fw-bold">{com.User.nickname}</div>
									{com.content}
								</div>
							</ListGroup.Item>
						))}
					</ListGroup>
					<Form className="visuallyHidden" style={{ width: "100%" }}>
						<Form.Group>
							<Form.Control
								as="textarea"
								rows="2"
								style={{ resize: "none" }}
								ref={content}
								maxLength={500}
								value={commentState}
								onChange={(e) => {
									setCommentState(e.target.value);
								}}
								placeholder="write comment"
								required
							/>
							<div style={{ float: "right", marginTop: "0.1rem" }}>
								<button
									type="button"
									className="btn btn-primary"
									onClick={submitHandler}
								>
									woof
								</button>
							</div>
						</Form.Group>
					</Form>
				</>
			)}
		</Card>
	);
};

export default PostCard;
