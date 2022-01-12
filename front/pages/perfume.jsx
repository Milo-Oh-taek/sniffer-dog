import React from "react";

import { useSelector } from "react-redux";

import { wrapper } from "../store";

import Greeting from "../components/perfume/Greeting";
import Filter from "../components/perfume/Filter";
import CardList from "../components/perfume/CardList";

import axiosInstance from "../common/customAxios";

import { getUserInfo } from "../store/thunk/userThunk";
import { getPerfumeList } from "../store/thunk/perfumeThunk";
import { getBrandList } from "../store/thunk/brandThunk";

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

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {

		let { keyword, brand, gender, page } = context.query;

		const conditions = {
			keyword,
			brand,
			gender,
			page: page? page : 1,
		}

		const cookie = context.req ? context.req.headers.cookie : "";
		axiosInstance.defaults.headers.Cookie = "";
		if (context.req && cookie) {
			axiosInstance.defaults.headers.cookie = cookie;
			await store.dispatch(getUserInfo());
		}

		await store.dispatch(getPerfumeList(conditions));
		await store.dispatch(getBrandList());
	}
);

export default Perfume;
