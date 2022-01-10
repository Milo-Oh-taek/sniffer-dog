import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { likePerfume } from "../../store/thunk/userThunk";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

import StarRatingComponent from "react-star-rating-component";
import { Link } from "react-scroll";

const PerfumeInfo = () => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.user.userInfo?.userInfo);
	const userPerfume = useSelector((state) => state.user.userInfo?.likes);
	const perfumeInfo = useSelector((state) => state.perfume.detail);
	const statistics = useSelector((state) => state.review.statistics);
	const reviewTotalCnt = useSelector((state) => state.review.totalCount);

	const clickHandler = () => {
		if (!(userInfo && userInfo.id)) {
			if (confirm("go to Login?")) {
				Router.replace("/login");
			} else {
				return;
			}
		}
		dispatch(
			likePerfume({
				data: {
					userId: userInfo.id,
					perfumeId: perfumeInfo.id,
				},
			}),
		);
	};

	return (
		<Container
			fluid
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Row>
				<Col sm={5} style={{ textAlign: "center" }}>
					<Image
						style={{ marginTop: "3rem", width: "70%" }}
						src={perfumeInfo.pic1}
						fluid
						alt="perfumePic1"
					/>
					<div>
						<Link to="reviewArea">
							<br />
							<StarRatingComponent
								name="rate1"
								starCount={5}
								value={statistics.overall}
							/>
							<br />
							<span style={{ cursor: "pointer", textDecoration: "underline" }}>
								({reviewTotalCnt})
							</span>
						</Link>
					</div>
				</Col>
				<Col sm={7} style={{ marginTop: "2rem" }}>
					<Card>
						<Card.Body>
							<span style={{ float: "right" }}>
								{userPerfume && userPerfume.indexOf(perfumeInfo.id) !== -1 ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-heart-fill"
										viewBox="0 0 16 16"
										style={{ cursor: "pointer" }}
										onClick={clickHandler}
									>
										<path
											fillRule="evenodd"
											d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-heart"
										viewBox="0 0 16 16"
										style={{ cursor: "pointer" }}
										onClick={clickHandler}
									>
										<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
									</svg>
								)}
							</span>

							<Card.Title>{perfumeInfo.name}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								{perfumeInfo.Brand.name}
							</Card.Subtitle>
							<Card.Text>{perfumeInfo.description}</Card.Text>
							<Card.Link
								href={perfumeInfo.Brand.website}
								style={{ color: "black" }}
							>
								OFFICIAL WEBSITE
							</Card.Link>
						</Card.Body>
					</Card>
					<Card style={{ textAlign: "center" }}>
						<Card.Header>Notes</Card.Header>
						<ListGroup variant="flush">
							<ListGroup.Item>
								Top:{" "}
								{perfumeInfo.topNote.map((note) => (
									<Badge key="index" bg="secondary">
										{note}
									</Badge>
								))}
							</ListGroup.Item>
							<ListGroup.Item>
								Middle:{" "}
								{perfumeInfo.middleNote.map((note) => (
									<Badge key="index" bg="secondary">
										{note}
									</Badge>
								))}
							</ListGroup.Item>
							<ListGroup.Item>
								Base:{" "}
								{perfumeInfo.baseNote.map((note) => (
									<Badge key="index" bg="secondary">
										{note}
									</Badge>
								))}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default PerfumeInfo;
