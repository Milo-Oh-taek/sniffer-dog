import React from "react";
import { useSelector } from "react-redux";

import ReviewCard from "./ReviewCard";

import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";

import styles from "styled-components";

import StarRatingComponent from "react-star-rating-component";

const Progress = styles.progress`
    -webkit-appearance: none;
    ::-webkit-progress-bar {
        background-color: lightgrey;
      }
`;

const ReviewList = () => {

	const statistics = useSelector((state) => state.review.statistics);
	const reviewTotalCnt = useSelector((state) => state.review.totalCount);

	return (
		<>
			<div style={{ textAlign: "center", margin: "2rem" }} id="reviewArea">
				<h1>Customer Reviews</h1>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					marginBottom: "1rem",
				}}
			>
				<CardGroup style={{ width: "50%" }}>
					<Card style={{ textAlign: "center", border: "none" }}>
						<Card.Body style={{ textAlign: "center" }}>
							<Card.Title>
								<h1>{statistics.overall}</h1>
							</Card.Title>
							<Card.Text>
								<StarRatingComponent
									name="rate1"
									starCount={5}
									value={statistics.overall}
								/>
								<br />({reviewTotalCnt})
							</Card.Text>
						</Card.Body>
					</Card>
					<Card style={{ textAlign: "center", border: "none" }}>
						<Card.Body style={{ textAlign: "center" }}>
							<Card.Text>
								<div>
									5 stars{" "}
									<Progress
										value={statistics.cntInfo[4]}
										max={reviewTotalCnt}
									/>{" "}
									{statistics.cntInfo[4]}
								</div>
								<div>
									4 stars{" "}
									<Progress
										value={statistics.cntInfo[3]}
										max={reviewTotalCnt}
									/>{" "}
									{statistics.cntInfo[3]}
								</div>
								<div>
									3 stars{" "}
									<Progress
										value={statistics.cntInfo[2]}
										max={reviewTotalCnt}
									/>{" "}
									{statistics.cntInfo[2]}
								</div>
								<div>
									2 stars{" "}
									<Progress
										value={statistics.cntInfo[1]}
										max={reviewTotalCnt}
									/>{" "}
									{statistics.cntInfo[1]}
								</div>
								<div>
									1 stars{" "}
									<Progress
										value={statistics.cntInfo[0]}
										max={reviewTotalCnt}
									/>{" "}
									{statistics.cntInfo[0]}
								</div>
							</Card.Text>
						</Card.Body>
					</Card>
				</CardGroup>
			</div>
			<ReviewCard />
		</>
	);
};

export default ReviewList;
