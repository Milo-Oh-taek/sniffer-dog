import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { getReviewList } from "../../store/thunk/reviewThunk";
import { resetlikedError } from "../../store/modules/reviewSlice";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import ReviewDetail from "./ReviewDetail";

const ReviewCard = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const [sortby, setSortby] = useState();

	const userInfo = useSelector((state) => state.user.userInfo?.userInfo);
	const likedMsg = useSelector((state) => state.review.likedError);
	const hasMoreReviews = useSelector((state) => state.review.hasMoreReviews);
	const reviewList = useSelector((state) => state.review.list);

	const id = router.query.id;
	const reviewSize = 5;

	useEffect(() => {
		if (!likedMsg) return;
		alert(likedMsg);
		dispatch(resetlikedError());
	}, [likedMsg]);

	const loadMoreHandler = () => {
		const page = reviewList.length / reviewSize + 1;
		dispatch(getReviewList({ id, page, sortby }));
	};

	const selectSortHandler = (e) => {
		setSortby(e.target.value);
		dispatch(getReviewList({ id, page: 1, sortby: e.target.value }));
	};

	const writeBtnHandler = () => {
		if (!userInfo) {
			if (confirm("go to Login?")) {
				router.push("/login");
			}
			return;
		}

		router.push(`/perfume/reviewForm?id=${id}`);
	};

	return (
		<div style={{ width: "90%", margin: "auto" }}>
			<div style={{ float: "right" }}>
				<Button
					style={{ margin: "0.1rem" }}
					variant="dark"
					onClick={writeBtnHandler}
				>
					Write a Review
				</Button>
				<Form.Select
					aria-label="Default select example"
					onChange={selectSortHandler}
				>
					<option value="recent">Most Recent</option>
					{/* <option value="helpful">Most Helpful</option> */}
					<option value="low">Lowest Rated</option>
					<option value="high">Highest Rated</option>
					<option value="old">Oldest</option>
				</Form.Select>
			</div>
			<div style={{ clear: "both" }}></div>

			{reviewList.map((review) => (
				<ReviewDetail
					review={review}
					sortby={sortby}
					reviewList={reviewList}
					reviewSize={reviewSize}
					key={review.id}
					id={id}
					userInfo={userInfo}
				/>
			))}

			<div className="text-center">
				{hasMoreReviews && (
					<Button variant="dark" onClick={loadMoreHandler}>
						Sniff More
					</Button>
				)}
				{!hasMoreReviews && (
					<Button variant="dark" onClick={loadMoreHandler} disabled>
						Sniff More
					</Button>
				)}
			</div>
		</div>
	);
};

export default ReviewCard;
