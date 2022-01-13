import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Paginator from "./Paginator";
import { useRouter } from 'next/router';

const CardList = ({perfumeList,perfumeListLoading,perfumeCount}) => {
	const router = useRouter();
	const { keyword } = router.query;

	const goDetail = (id) => {
		router.push(`/perfume/${id}`);
	};

	return (
		<>
			{perfumeListLoading ? (
				<div
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "40%",
					}}
				>
					<Spinner
						animation="border"
						role="status"
						style={{
							display: "block",
							position: "fixed",
							zIndex: "1031",
							top: "calc(50%-(...px /2))",
							right: "calc(50%-(...px/2))",
						}}
					>
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			) : (
				<Row
					xs={2}
					md={4}
					className="g-4"
					style={{ width: "100%", textAlign: "center" }}
				>
					
					<div style={{ width: "100%" }}>
						{keyword && <h2>Search Lists of &apos;{keyword}&apos; </h2>}
						
						<h4>({perfumeCount})</h4>
						{!perfumeCount && (
							<h3 style={{marginTop:'40%'}}>- No Results -</h3>
						)}
					</div>
					

					{perfumeList?.map((item) => (
						<Col key={item.id}>
							<Card
								border="light"
								style={{ width: "12rem", height: "18rem", cursor: "pointer" }}
								onClick={() => {
									goDetail(item.id);
								}}
							>
								<Card.Img
									variant="top"
									src={item.pic1}
									style={{ height: "10rem" }}
								/>
								<Card.Body>
									<Card.Title>{item.name}</Card.Title>
									<Card.Text>{item.Brand.name}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
					{perfumeCount? <Paginator />: null}
				</Row>
			)}
		</>
	);
};

export default CardList;
