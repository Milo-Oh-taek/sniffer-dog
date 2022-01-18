import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Router from 'next/router';

import { loginRequest } from "../store/thunk/userThunk";
import { resetLoginErr } from '../store/modules/userSlice';

import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

import Form from "react-bootstrap/Form";
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

const Login = () => {
	const emailInput = useRef();
	const passwordInput = useRef();
	const dispatch = useDispatch();
	const errorMessage = useSelector((state) => state.user.loginError);
	const userInfo = useSelector((state) => state.user.userInfo);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			loginRequest({
				email: emailInput.current.value,
				password: passwordInput.current.value,
			}),
		);
	};

	useEffect(() => {
        if (userInfo && userInfo.id) {
          Router.push('/');
        }
      }, [userInfo]);

	const resetMsg = () => {
		if(!errorMessage){
			return;
		}
		dispatch(resetLoginErr());
	}

	return (
		<ContainDiv>
			<FormCss onSubmit={submitHandler}>
				<h2 className="text-center" style={{ marginBottom: "3rem" }}>SIGN IN</h2>
				<Form.Group className="mb-3" controlId="formGroupEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						ref={emailInput}
						placeholder="Enter email"
						onChange={resetMsg}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formGroupPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						ref={passwordInput}
						placeholder="Password"
						onChange={resetMsg}
					/>
				</Form.Group>
				<div className="text-center" style={{color:"red"}}>
					<span>{errorMessage}</span>
				</div>
				
				<div className="text-center">
					<Button variant="primary" type="submit" className="w-100">
						Log In
					</Button>
					<br />
					<Link href="/signup">go to sign up</Link>
				</div>
			</FormCss>
		</ContainDiv>
	);
};

export default Login;
