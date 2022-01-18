import React, { useState, useEffect } from "react";
import Router from "next/router";

import { useSelector, useDispatch } from "react-redux";

import { signupRequest } from "../store/thunk/userThunk";
import { resetSignupErr, resetSignupDone } from "../store/modules/userSlice";

import styled from "styled-components";

import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

const FormCss = styled(Form)`
	width: 40%;
	margin: 15%;

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

const Signup = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordChk, setPasswordChk] = useState("");
	const [nickname, setNickname] = useState("");
	const [verify, setVerify] = useState(false);

	const { errorMessage, signupLoading, signupDone, userInfo } = useSelector(
		(state) => state.user,
	);

	useEffect(() => {
		if (userInfo && userInfo.id) {
			Router.replace("/");
		}
	}, [userInfo]);

	useEffect(() => {
		if (signupDone) {
			alert("registered! please log in");
			dispatch(resetSignupDone());
			Router.replace("/login");
		}
	}, [signupDone]);

	useEffect(() => {
		if (
			email &&
			password &&
			password === passwordChk &&
			nickname.length > 3 &&
			nickname.length < 12
		) {
			setVerify(true);
		} else {
			setVerify(false);
		}
	}, [email, password, passwordChk, nickname]);

	useEffect(() => {
		if (!errorMessage) {
			return;
		}
		dispatch(resetSignupErr());
	}, [email, nickname]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			signupRequest({
				data: {
					email,
					password,
					nickname,
				},
			}),
		);
	};

	return (
		<ContainDiv>
			<FormCss onSubmit={submitHandler}>
				<h2 className="text-center" style={{ marginBottom: "3rem" }}>SIGN UP</h2>
				<Form.Group className="mb-3" controlId="formGroupEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						maxLength={40}
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formGroupPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						maxLength={30}
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formGroupPassword">
					<Form.Label>Password Check</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password Check"
						maxLength={30}
						required
						value={passwordChk}
						onChange={(e) => setPasswordChk(e.target.value)}
					/>
					{passwordChk && password !== passwordChk ? (
						<div style={{ color: "red" }}>
							<span>password incorrect</span>
						</div>
					) : null}
				</Form.Group>
				<Form.Group className="mb-3" controlId="formGroupPassword">
					<Form.Label>Nickname</Form.Label>
					<Form.Control
						type="text"
						placeholder="Nickname(4~12 letters)"
						maxLength={15}
						required
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
					/>
					{nickname && (nickname.length < 4 || nickname.length > 12) ? (
						<div style={{ color: "red" }}>
							<span>nickname 4~12 letters</span>
						</div>
					) : null}
				</Form.Group>

				<div className="text-center">
					<Button
						variant="primary"
						type="submit"
						disabled={!verify}
						className="w-100"
					>
						{signupLoading ? (
							<Spinner
								as="span"
								animation="border"
								size="sm"
								role="status"
								aria-hidden="true"
							/>
						) : (
							"Sign Up"
						)}
					</Button>
					<div className="text-center" style={{ color: "red"}}>
						<span>{errorMessage}</span>
					</div>
					<br />
				</div>
			</FormCss>
		</ContainDiv>
	);
};

export default Signup;
