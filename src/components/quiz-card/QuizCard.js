import DeleteIcon from "@mui/icons-material/DeleteRounded";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import "../quiz-card/QuizCard.css";

function QuizCard(props) {
	const [optionField, setOptionField] = useState("");
	const [option, setOption] = useState("");

	const getOption = (e) => {
		setOptionField(e.target.value);
	};
	const deleteOption = (event) => {
		var temp = props.data;
		var boolData = temp[temp.length - 1];
		event.preventDefault();
		props.deleteOption({ value: props.data, correct_answer: boolData });
	};
	return (
		<div className="answer-layout">
			<div>
				<div className="q-card">
					<TextField
						id="standard-basic"
						placeholder="Add Answer"
						variant="standard"
						className="w100"
						onChange={getOption}
						value={props.data.slice(0, -1)}
					/>
					<div>
						<IconButton
							aria-label="delete"
							onClick={deleteOption}>
							<DeleteIcon />
						</IconButton>
					</div>
				</div>
				<div className="answer-checkbox">
					<Checkbox
						color="success"
						checked={
							parseInt(
								props.data[props.data.length - 1]
							) === 1
								? true
								: false
						}
						disabled={
							parseInt(
								props.data[props.data.length - 1]
							) === 1
								? false
								: true
						}
					/>
				</div>
			</div>
		</div>
	);
}

export default QuizCard;
