import React from "react";
import "../card/Card.css";
function Card(props) {
	console.log(props);
	const divStyle = {
		backgroundImage: props.create
			? 'url("../../images/create_quiz.png")'
			: 'url("../../images/view_quiz.png")',
	};
	return (
		
	);
}

export default Card;
