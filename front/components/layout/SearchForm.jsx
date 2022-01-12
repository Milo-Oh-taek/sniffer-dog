import React, { useRef } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { useRouter } from 'next/router';

const SearchForm = () => {
	const keywordRef = useRef();
	const router = useRouter();

	const searchHandler = (e) => {
		e.preventDefault();
		const keyword = keywordRef.current.value;

		router.push({
			pathname: '/perfume',
			query: { keyword }
		});
	};

	const resetHandler = () => {
		keywordRef.current.value = null;
		router.push({
			pathname: '/perfume',
		});
	}

	return (
		<form onSubmit={searchHandler}>
			<InputGroup className="mb-3">
				<FormControl
					placeholder="Search perfumes"
					aria-describedby="basic-addon2"
					ref={keywordRef}
				/>
				<Button
					variant="dark"
					type="submit"
				>
					Sniff!
				</Button>
				<Button
					variant="secondary"
					type="button"
					onClick={resetHandler}
				>
					Reset!
				</Button>
			</InputGroup>
		</form>
	);
};

export default SearchForm;
