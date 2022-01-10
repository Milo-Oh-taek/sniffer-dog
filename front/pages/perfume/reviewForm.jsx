import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { postReview } from "../../store/thunk/reviewThunk";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import styled from "styled-components";

import StarRatingComponent from "react-star-rating-component";

const FormCss = styled(Form)`
	width: 40%;

	@media screen and (max-width: 768px) {
		width: 70%;
	}
`;

const ContainDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	flex-direction: column;
`;

const ReviewForm = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const id = router.query.id;
	const userInfo = useSelector((state) => state.user.userInfo?.userInfo);
	const perfumeInfo = useSelector((state) => state.perfume.detail);
	const postFulfilled = useSelector((state) => state.review.postFulfilled);

	useEffect(() => {
		console.log(perfumeInfo);
		if (!(perfumeInfo && perfumeInfo.name) || !userInfo) {
			if(id){
				router.push(`/perfume/${id}`);
			} else {
				router.push(`/perfume`);
			}
			
		}
	}, []);

	useEffect(() => {
		if(postFulfilled){
			router.push(`/perfume/${id}`);
		}
	},[postFulfilled])

	const title = useRef();
	const text = useRef();
	const [longevity, setLongevity] = useState(5);
	const [sillage, setSillage] = useState(5);
	const [male, setMale] = useState(5);
	const [female, setFemale] = useState(5);
	const [value, setValue] = useState(5);
	const [overall, setOverall] = useState(3);

	const submitHandler = (e) => {
		e.preventDefault();
		if(!title || !text || !longevity || !sillage || !male || !female || !value || !overall){
			alert('need to fill out');
		}

		dispatch(postReview({
			perfumeId: perfumeInfo.id,
			userId: userInfo.id,
			title: title.current.value.trim(),
			text: text.current.value.trim(),
			longevity,
			sillage,
			male,
			female,
			value,
			overall 
		}))
	};

	const setScore = (nextValue, prevValue, name) => {
		switch (name) {
			case "longevity":
				setLongevity(nextValue);
				break;
			case "sillage":
				setSillage(nextValue);
				break;
			case "male":
				setMale(nextValue);
				break;
			case "female":
				setFemale(nextValue);
				break;
			case "value":
				setValue(nextValue);
				break;
			case "overall":
				setOverall(nextValue);
				break;
		}
	};

	return (
		<ContainDiv>
			<FormCss onSubmit={submitHandler}>
				<h2 style={{ textAlign: "center", margin: "3rem" }}>
					Register a review
				</h2>
				<Form.Group className="mb-3">
					<Form.Label>Product</Form.Label>
					<Form.Control
						type="input"
						required
						value={perfumeInfo?.name}
						disabled
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Review title</Form.Label>
					<Form.Control
						type="input"
						ref={title}
						maxLength={40}
						required
						placeholder="ex) I would buy this product again"
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Review comments</Form.Label>
					<Form.Control
						as="textarea"
						rows="10"
						ref={text}
						maxLength={1000}
						required
						placeholder="How you use the product. Things that are greate about it. Things that aren't great about it"
					/>
				</Form.Group>
				<br />
				<Form.Group className="mb-3">
					<Form.Label>
						<h4>Rating</h4>
					</Form.Label>
					<br />
					<div>Longevity</div>
					<StarRatingComponent
						onStarClick={setScore.bind(this)}
						name="longevity"
						starCount={10}
						value={longevity}
					/>
					<div>Sillage</div>
					<StarRatingComponent
						onStarClick={setScore.bind(this)}
						name="sillage"
						starCount={10}
						value={sillage}
					/>
					<div>Male</div>
					<StarRatingComponent
						onStarClick={setScore.bind(this)}
						name="male"
						starCount={10}
						value={male}
					/>
					<div>Female</div>
					<StarRatingComponent
						onStarClick={setScore.bind(this)}
						name="female"
						starCount={10}
						value={female}
					/>
					<div>Price for value</div>
					<StarRatingComponent
						onStarClick={setScore.bind(this)}
						name="value"
						starCount={10}
						value={value}
					/>
					<br />
					<br />
					<Form.Label>
						<h4>Overall</h4>
					</Form.Label>
					<br />
					<StarRatingComponent
						onStarClick={setScore.bind(this)}
						name="overall"
						starCount={5}
						value={overall}
					/>
				</Form.Group>
				<Button
					variant="primary"
					type="submit"
					style={{ width: "100%", marginBottom: "3rem" }}
				>
					Submit
				</Button>
			</FormCss>
		</ContainDiv>
	);
};

export default ReviewForm;
