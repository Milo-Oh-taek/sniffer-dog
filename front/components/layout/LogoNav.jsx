import React from "react";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { logoutRequest } from "../../store/thunk/userThunk";

import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Link from "next/link";
import styled from "styled-components";

const LinkStyle = styled.a`
	text-decoration: none;
	color: white;
	cursor: pointer;
	&:hover {
		color: white;
	}
`;
const SpanStyle = styled.span`
	color: white;
	cursor: pointer;
`;

const LogoNav = () => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.user.userInfo?.userInfo);
	const userPerfume = useSelector((state) => state.user.userInfo?.likes);

	const logoutHandler = () => {
		dispatch(logoutRequest());
		Router.push("/login");
	};

	return (
		<Navbar expand="sm" bg="dark" variant="dark">
			<Container className="justify-content-start">
				{/* <Navbar.Brand style={{ fontSize: "1rem" }}>admin</Navbar.Brand> */}
			</Container>
			<Container className="justify-content-center">
				<Navbar.Brand style={{ fontSize: "3rem" }}>SNIFFER DOG</Navbar.Brand>
			</Container>
			<Container className="justify-content-end">
				<Navbar.Brand>
					{userInfo && userInfo.id ? (
						<SpanStyle onClick={logoutHandler}>Logout</SpanStyle>
					) : (
						<Link href="/login" passHref>
							<LinkStyle>LogIn</LinkStyle>
						</Link>
					)}
				</Navbar.Brand>
				<Navbar.Brand>
					<Link href="/mypage" passHref>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-person-circle"
							viewBox="0 0 16 16"
							style={{ cursor: "pointer" }}
						>
							<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
							<path
								fillRule="evenodd"
								d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
							/>
						</svg>
					</Link>
				</Navbar.Brand>
				<Navbar.Brand>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-heart"
						viewBox="0 0 16 16"
					>
						<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
					</svg>
					<Badge bg="dark">{userPerfume ? userPerfume.length : 0}</Badge>
				</Navbar.Brand>
				<Navbar.Brand>
					<Link href="https://github.com/Milo-Oh-taek/sniffer-dog">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-github"
							viewBox="0 0 16 16"
							style={{cursor:'pointer'}}
						>
							<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
						</svg>
					</Link>
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default LogoNav;
