import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";

import { getBrandList } from "../../store/thunk/brandThunk";
import { getPerfumeList } from "../../store/thunk/perfumeThunk";
import { getUserInfo } from "../../store/thunk/userThunk";
import axiosInstance from "../../common/customAxios";

import Cookies from "universal-cookie";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import styles from "./Filter.module.css";

const Filter = () => {
	const dispatch = useDispatch();
	const cookies = new Cookies();
	const brandList = useSelector((state) => state.brand.list);
	const router = useRouter();
	const path = router.pathname;
	const { query } = router;
	

	let { keyword = "", gender = [], brand = [], page = 1} = query;

	const [keywordState, setKeywordState] = useState(keyword);
	const [bndStates, setBndStates] = useState(typeof brand =='object'? brand: [brand]);
	const [genStates, setGenStates] = useState(typeof gender =='object'? gender: [gender]);
	const [pageState, setPageState] = useState(page);

	if(page != pageState) setPageState(page);
	if(keyword != keywordState){
		setBndStates([]);
		setGenStates([]);
		setKeywordState(keyword);
	} 

	const conditions = {
		"keyword": keywordState,
		"brand": bndStates,
		"gender": genStates,
		"page": pageState,
	};

	useEffect(() => {
		dispatch(getPerfumeList(conditions));
	},[pageState, /*keywordState*/])

	useEffect(() => {
		const token = cookies.get(process.env.NEXT_PUBLIC_COOKIE_NAME)? cookies.get(process.env.NEXT_PUBLIC_COOKIE_NAME) : "";

		axiosInstance.defaults.headers.Cookie = "";
		if(token){
			axiosInstance.defaults.headers.cookie = token;
			dispatch(getUserInfo());
		}
	},[])

	useEffect(() => {
		conditions.page = 1;
		
		router.push({
			pathname: path,
			query: conditions,
		});

		dispatch(getBrandList());
		dispatch(getPerfumeList(conditions));

	}, [keywordState, bndStates, genStates]);


	const bndCheckboxHandler = (value) => {
		const val = value.toString();
		const index = bndStates.indexOf(val);

		if (index === -1) {
			setBndStates([...bndStates, val ]);
		} else {
			setBndStates(bndStates.filter(bnd => bnd != val));
		}
	};

	const genCheckboxHandler = (value) => {
		const index = genStates.indexOf(value);

		if (index === -1) {
			setGenStates([...genStates, value ]);
			console.log("genStates",genStates);
		} else {
			setGenStates(genStates.filter(gen => gen !== value))
		}
	};

	return (
		<>
			<section style={{ width: "100%" }} className={styles.filterArea}>
				<Card border="light" style={{ width: "18rem" }}>
					<Card.Header>Gender</Card.Header>
					<Card.Body>
						<Card.Text>
							<Form.Check
								aria-label="Unisex"
								value="N"
								label="Unisex"
								checked={genStates.indexOf("N") === -1 ? false : true}
								onChange={(e) => {
									genCheckboxHandler(e.currentTarget.value);
								}}
							/>
							<Form.Check
								aria-label="Unisex"
								value="M"
								label="Men"
								checked={genStates.indexOf("M") === -1 ? false : true}
								onChange={(e) => {
									genCheckboxHandler(e.currentTarget.value);
								}}
							/>
							<Form.Check
								aria-label="Unisex"
								value="F"
								label="Women"
								checked={genStates.indexOf("F") === -1 ? false : true}
								onChange={(e) => {
									genCheckboxHandler(e.currentTarget.value);
								}}
							/>
						</Card.Text>
					</Card.Body>
				</Card>
				<Card border="light" style={{ width: "18rem" }}>
					<Card.Header>Brand ({brandList.count})</Card.Header>
					<Card.Body>
						<Card.Text style={{ overflow: "scroll", height: "35rem" }}>
							{brandList.rows &&
								brandList.rows.map((item) => (
									<Form.Check
										key={item.id}
										checked={bndStates.indexOf(item.id+"") === -1 ? false : true}
										label={item.name + "(" + ")"}
										onChange={() => {
											bndCheckboxHandler(item.id);
										}}
									/>
								))}
						</Card.Text>
					</Card.Body>
				</Card>
			</section>
		</>
	);
};

export default Filter;
