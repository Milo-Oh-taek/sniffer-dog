import React from "react";

import { useSelector } from "react-redux";

import Greeting from "../components/perfume/Greeting";
import Filter from "../components/perfume/Filter";
import CardList from "../components/perfume/CardList";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Perfume = () => {
	const perfumeList = useSelector((state) => state.perfume.list.rows);
	const perfumeListLoading = useSelector((state) => state.perfume.isLoading);
	const perfumeCount = useSelector((state) => state.perfume.list.count);
	return (
		<>
			<Greeting />
			<Container fluid>
				<Row>
					<Col sm={3}>
						<Filter />
					</Col>
					<Col sm={9}>
						<CardList
							perfumeList={perfumeList}
							perfumeCount={perfumeCount}
							perfumeListLoading={perfumeListLoading}
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
};

// export const getServerSideProps = wrapper.getServerSideProps(
// 	(store) => async (context) => {
// 		console.log("getServerSideProps start");
// 		console.log(
// 			"%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%header check%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",
// 		);
// 		console.log(context.req);
// 		console.log(
// 			"%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%header check%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",
// 		);
// 		const cookie = context.req ? context.req.headers.cookie : "";
// 		axiosInstance.defaults.headers.Cookie = "";
// 		if (context.req && cookie) {
// 			axiosInstance.defaults.headers.cookie = cookie;
// 			await store.dispatch(getUserInfo());
// 		}

// 		await store.dispatch(getPerfumeList());
// 		await store.dispatch(getBrandList());
// 		console.log("getServerSideProps end");
// 	},
// );

export default Perfume;
