import React from "react";
import { useSelector } from "react-redux";
import { wrapper } from "../../store";
import { getPerfumeDetail } from "../../store/thunk/perfumeThunk";
import { getReviewList, getReviewStats } from "../../store/thunk/reviewThunk";
import { getUserInfo } from '../../store/thunk/userThunk';

import axiosInstance from '../../common/customAxios';

import Radar from "../../components/detail/Radar";
import PerfumeInfo from "../../components/detail/PerfumeInfo";
import ReviewList from "../../components/detail/ReviewList";


const PerfumeDetail = () => {
	const radarData = useSelector((state) => state.review.statistics.RadarData);

	return (
		<>
			<PerfumeInfo />
			<div style={{ height: "30rem" }}>
				<Radar data={ radarData } />
			</div>
			<ReviewList />
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		const cookie = context.req ? context.req.headers.cookie : '';
		axiosInstance.defaults.headers.Cookie = '';
		if (context.req && cookie) {
			axiosInstance.defaults.headers.Cookie = cookie;
			await store.dispatch(getUserInfo())
		}

		const id = context.query.id;

		await store.dispatch(getPerfumeDetail(id));
		await store.dispatch(getReviewStats(id));
		await store.dispatch(getReviewList({ id, page:1 }));
	},
);

export default PerfumeDetail;
