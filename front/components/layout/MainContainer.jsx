import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "react-bootstrap/Image";
import styles from "styled-components";

const VideoCustom = styles.video`
    position: fixed;
    left: 0;
	top: 38px;
    width: 100%;
	height: 100%;
    z-index: -1;
`;

const MainContainer = () => {
	const videoRef = useRef();
	const [opacityA, setOpacityA] = useState();
	const [sectionHeight, setSectionHeight] = useState();

	const ScrollListener = () => {
		let nowHeight = window.scrollY;
		let totalHeight = document.body.offsetHeight - window.innerHeight;
		let percent = nowHeight / totalHeight;

		if (percent < 0.2) {
			setOpacityA(percent * 3);
		} else {
			setOpacityA(3 - percent * 5);
		}

		videoRef.current.currentTime = videoRef.current.duration * percent * 3;
		videoRef.current.style.opacity = 2 - (percent * 3);
	};

	useEffect(() => {
		window.addEventListener("scroll", ScrollListener);
		return () => {
			window.removeEventListener("scroll", ScrollListener);
		};
	});

	// Load or Resize
	const setLayout = () => {
		setSectionHeight(window.innerHeight * 4);
	};

	useEffect(() => {
		window.addEventListener("load", setLayout);
	});

	useEffect(() => {
		window.addEventListener("resize", setLayout);
	});

	useEffect(() => {
		setLayout();
	},[]);

	return (
		<>
			<VideoCustom ref={videoRef} src="/video/berdoues2.mp4" />
			<div className="container">
				<section
					className="scroll-section"
					id="scroll-section-0"
					style={{ height: `${sectionHeight}px` }}
				>
					<h1>Milo&apos;s portfolio</h1>
					<div
						className="sticky-elem main-message a"
						style={{ opacity: `${opacityA}` }}
					>
						<p>the enveloping fragrance of Oud Wood</p>
					</div>
				</section>
				<section
					className="scroll-section"
					id="scroll-section-1"
					// style={{ height: `${sectionHeight}px` }}
				>
					<p className="description">
						<strong>Oud Al Sahraa,</strong>
						<br />
						<br />
						<br />
						<br />
						From the Arabic &quot; Oud Al Sahraa &quot; = &quot;Oud of the desert&quot;, it evokes
						the land and origins of the Orient.
						<br />
						<br />
						Oud Al Sahraa reveals a blend of character where mandarin from
						Italy, myrrh from Namibia and oud wood from Malaysia meet to release
						a powerful and bewitching bouquet.
						<br />
						<br />
						Malaysian oud wood - Namibian myrrh - Italian mandarin Olfactory
						creation by Christian Vermorel.
					</p>
				</section>
				<section
					className="scroll-section"
					id="scroll-section-2"
					// style={{ height: `${sectionHeight}px` }}
				>
					<Image src="/image/oud1.png" alt="berdoues image" width="60%" />
					<Image src="/image/oud2.png" alt="berdoues image" width="60%" />
					<Image src="/image/oud3.jpg" alt="berdoues image" width="60%" />
					<br />
					<div className="description">
						<p>
							ALCOHOL DENAT, AQUA, PARFUM, BENZYL ALCOHOL, CINNAMYL ALCOHOL,
							CITRAL, BENZYL SALICYLATE, COUMARIN, GERANIOL, BENZYL CINNAMATE,
							LINALOOL, BENZYL BENZOATE, CITRONELLOL, LIMONENE, ALPHA-ISOMETHYL
							IONONE.
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
				</section>
			</div>
		</>
	);
};

export default MainContainer;
