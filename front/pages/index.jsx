import React from "react";
import { wrapper } from "../store/index";

import { getUserInfo } from "../store/thunk/userThunk";
import axiosInstance from "../common/customAxios";

import MainContainer from "../components/layout/MainContainer";

const Home = () => {
	return (
		<MainContainer />
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		const cookie = context.req ? context.req.headers.cookie : "";
		axiosInstance.defaults.headers.Cookie = "";
		if (context.req && cookie) {
			axiosInstance.defaults.headers.cookie = cookie;
			await store.dispatch(getUserInfo());
		}
	},
);

export default Home;
