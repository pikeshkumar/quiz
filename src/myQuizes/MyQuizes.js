import Button from "@mui/material/Button";
import React from "react";
import { Link } from "react-router-dom";
import Table from "../components/table/Table";
import "../myQuizes/MyQuizes.css";

function MyQuizes() {
	return (
		<div className="my-quiz-dashboard">
			<div className="mq-header">
				<div className="mq-title">My MyQuizes</div>
				<div>
					<Button
						component={Link}
						to="/create-quiz"
						color="primary"
						variant="contained">
						Create New Quiz
					</Button>
				</div>
			</div>
			<Table />
		</div>
	);
}

export default MyQuizes;
