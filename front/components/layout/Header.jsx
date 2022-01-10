import React from "react";
import LogoNav from "./LogoNav";
import MenuNav from "./MenuNav";
import SearchForm from "./SearchForm";

const Header = () => {
	return (
		<>
			<LogoNav />
			<MenuNav />
			<SearchForm />
		</>
	);
};

export default Header;
