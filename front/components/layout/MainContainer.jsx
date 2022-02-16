import React from "react";
import Link from "next/link";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";

const MainContainer = () => {
	return (
		<>
			<p className="description">
				<strong>Oud Al Sahraa,</strong>
				<br />
				<br />
				From the Arabic &quot; Oud Al Sahraa &quot; = &quot;Oud of the
				desert&quot;, it evokes the land and origins of the Orient.
				<br />
				<br />
				Oud Al Sahraa reveals a blend of character where mandarin from Italy,
				myrrh from Namibia and oud wood from Malaysia meet to release a powerful
				and bewitching bouquet.
				<br />
				<br />
				Malaysian oud wood - Namibian myrrh - Italian mandarin Olfactory
				creation by Christian Vermorel.
			</p>
			<section style={{ textAlign: "center" }}>
				<Carousel variant="dark" interval="3000">
					<Carousel.Item>
						<Image src="/image/oud1.png" alt="berdoues image" width="50%" />
					</Carousel.Item>
					<Carousel.Item>
						<Image src="/image/oud2.png" alt="berdoues image" width="50%" />
					</Carousel.Item>
					<Carousel.Item>
						<Image src="/image/oud3.jpg" alt="berdoues image" width="50%" />
					</Carousel.Item>
				</Carousel>
			</section>
			<div className="description">
				<p>
					ALCOHOL DENAT, AQUA, PARFUM, BENZYL ALCOHOL, CINNAMYL ALCOHOL, CITRAL,
					BENZYL SALICYLATE, COUMARIN, GERANIOL, BENZYL CINNAMATE, LINALOOL,
					BENZYL BENZOATE, CITRONELLOL, LIMONENE, ALPHA-ISOMETHYL IONONE.
				</p>
				<div style={{ float: "right" }}>
					<Link href="/perfume/7">
						<a className="nav-link active" aria-current="page">
							learn more &gt;&gt;&gt;
							<br />
							<br />
						</a>
					</Link>
				</div>
			</div>
		</>
	);
};

export default MainContainer;
