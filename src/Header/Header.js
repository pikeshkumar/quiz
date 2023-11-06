import React from "react";
import { NavLink } from "react-router-dom";
import "../Header/Header.css";
import Logo from "../images/logo.png";

function Header() {
	return (
		<div className="align header">
			<NavLink className="logo-width">
				<NavLink to="/">
					<img src={Logo} alt="logo" width={"120px"} />
				</NavLink>
			</NavLink>
			<div className="align menu-width">
				<NavLink to="/">Home</NavLink>
				{/* <NavLink to="/play-quiz">Play Quiz</NavLink> */}
				<NavLink to="/my-quiz">My Quizes</NavLink>
			</div>
		</div>
	);
}

export default Header;
