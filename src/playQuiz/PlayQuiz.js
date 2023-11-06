import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { default as React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import McqCard from "../components/mcq-card/McqCard";
import "../playQuiz/PlayQuiz.css";

function PlayQuiz() {
	const [quizActive, setQuizActive] = useState(false);
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");
	const [data, setData] = useState(null);
	const { key } = useParams();
	const getUsername = (event) => {
		const val = event.target.value;
		setUsername(val);

		if (val.trim() === "") {
			setError("Field cannot be empty");
		} else if (val.length < 5) {
			setError("Field must be at least 5 characters long");
		} else if (val.length > 50) {
			setError("Field must be at most 50 characters long");
		} else {
			setError("");
		}
	};
	const startQuiz = () => {
		if (error.length === 0 && username.trim().length > 0)
			setQuizActive(true);
	};
	useEffect(() => {
		const keys = Object.keys(localStorage);
		let flag = false;
		keys.map((keyVal) => {
			if (keyVal === key) {
				const storedData = JSON.parse(localStorage.getItem(key));
				setData(storedData);
				flag = true;
			}
		});
		if (!flag) {
			// console.log("param is invalid");
			return;
		}
	}, []);
	return (
		<>
			{data != null ? (
				<div className="pq-dashboard">
					<div hidden={quizActive}>
						<div className="pq-title">{data.title}</div>
						<div className="pq-body">{data.description}</div>
						<div className="pq-name">Enter your name</div>
						<div className="w40">
							<TextField
								error={error.length > 0 ? true : false}
								id="outlined-basic"
								label="Name"
								variant="outlined"
								onChange={getUsername}
								helperText={
									error.length >= 0 ? error : false
								}
							/>
						</div>
						<div className="pq-btn">
							<Button
								variant="contained"
								color="primary"
								type="submit"
								disabled={
									username.trim().length < 5 ||
									username.trim().length > 50
										? true
										: false
								}
								onClick={startQuiz}>
								Start Quiz
							</Button>
						</div>
					</div>
					{/* play quiz with option */}

					<div hidden={!quizActive}>
						<McqCard
							title={data.title}
							data={data.qList}
							qSize={data.qList.length}
							questionType={data.questionType}
						/>
					</div>
				</div>
			) : (
				"page not found"
			)}
		</>
	);
}

export default PlayQuiz;
