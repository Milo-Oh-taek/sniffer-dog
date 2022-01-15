import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { modifyReview } from "../../store/thunk/reviewThunk";

const ReviewModifyForm = ({ review }) => {
    const dispatch = useDispatch();
    const [titleForm, setTitleForm] = useState(review.title);
    const [contentForm, setContentForm] = useState(review.content);
    const userInfo = useSelector((state) => state.user.userInfo?.userInfo);

    const submitHandler = (e) => {
        e.preventDefault();
        if(!userInfo) return alert('need login');
        dispatch(modifyReview({
            id: review.id,
            title: titleForm,
            content: contentForm,
        })).then(
            alert('done')
        )
    }

	return (
		<Form key={review.id} style={{ margin: "3rem 1rem 0 0", width:'100%' }} onSubmit={submitHandler}>
			<Row className="mb-3">
				<Image
					fluid
					variant="top"
					src={review.Perfume.pic1}
					style={{ width: "15rem" }}
					alt="perfume Image"
				/>

				<Form.Group as={Col} controlId="formGridPassword">
					<Form.Label>perfume</Form.Label>
					<Form.Control type="input" value={review.Perfume.name} disabled />
					<br />
					<Form.Label>brand</Form.Label>
					<Form.Control
						type="input"
						value={review.Perfume.Brand.name}
						disabled
					/>
				</Form.Group>
			</Row>

			<Form.Group className="mb-3" controlId="title">
				<Form.Label>title</Form.Label>
				<Form.Control type="input" value={titleForm} required onChange={(e) => {setTitleForm(e.target.value)}}/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formGridAddress2">
				<Form.Label>text</Form.Label>
				<Form.Control
					as="textarea"
					rows="5"
					resize="none"
					maxLength={1000}
					value={contentForm}
					required
                    onChange={(e) => {setContentForm(e.target.value)}}
				/>
			</Form.Group>

			<Button variant="primary" type="submit" style={{ width: "100%" }}>
				modify
			</Button>
		</Form>
	);
};

export default ReviewModifyForm;
