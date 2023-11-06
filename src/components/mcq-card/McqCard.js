import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { default as React, useState } from "react";
import Celebration from "../../images/celebration.gif";
import "../mcq-card/McqCard.css";

function McqCard(props) {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [correctAnswer, setCorrectAnswer] = useState("");
	const [selectedAnswer, setSelectedAnswer] = useState("");
	const [score, setScore] = useState(0);

	const handleAnswerClick = (answer) => {
		if (currentQuestion < props.qSize && selectedAnswer.length > 0) {
			setCurrentQuestion(currentQuestion + 1);
			setSelectedAnswer("");
		}
		if (correctAnswer === selectedAnswer && selectedAnswer.length > 0) {
			setScore(score + 1);
		}
	};

	const getAnswer = (answer) => {
		setSelectedAnswer(answer);
		if (currentQuestion < props.qSize) {
			props.data[currentQuestion].option.map((val) => {
				if (val.charAt(val.length - 1) === "1") {
					setCorrectAnswer(val);
				}
			});
		}
	};
	return (
		<div>
			{
				<div className="mcq-dashboard">
					{currentQuestion < props.qSize ? (
						<div>
							<div className="mcq-title">
								{props.title}
							</div>
							<div className="mcq-question-layout">
								<div>
									{(currentQuestion + 1).toString() +
										". " +
										props.data[currentQuestion]
											.question}
								</div>
								<FormControl>
									<RadioGroup
										aria-labelledby="demo-radio-buttons-group-label"
										name="radio-buttons-group">
										{props.data[
											currentQuestion
										].option.map(
											(optVal, index) => {
												return (
													<FormControlLabel
														key={
															index
														}
														value={optVal.slice(
															0,
															-1
														)}
														control={
															// <Radio
															// 	onChange={() =>
															// 		getAnswer(
															// 			optVal
															// 		)
															// 	}
															// />
															props.questionType ===
															"single" ? (
																<Radio
																	onChange={() =>
																		getAnswer(
																			optVal
																		)
																	}
																/>
															) : props.questionType !==
															  "single" ? (
																<Checkbox
																	onChange={() =>
																		getAnswer(
																			optVal
																		)
																	}
																/>
															) : (
																<Radio
																	onChange={() =>
																		getAnswer(
																			optVal
																		)
																	}
																/>
															)
														}
														label={optVal.slice(
															0,
															-1
														)}
													/>
												);
											}
										)}
									</RadioGroup>
								</FormControl>
							</div>

							<div className="mcq-next-q">
								<div className="mcq-total-q">
									<b>
										Question {currentQuestion + 1}
									</b>
									/{props.qSize}
								</div>
								<div className="mcq-btn">
									<Button
										variant="contained"
										color="primary"
										onClick={handleAnswerClick}>
										{props.qSize ===
										currentQuestion + 1
											? "Submit"
											: "Next Question"}
									</Button>
								</div>
							</div>
						</div>
					) : (
						<div
							hidden={
								currentQuestion == props.qSize
									? false
									: true
							}
							className="result-style">
							<div>
								<img src={Celebration} />
								<div className="congratulation-style">
									Congratulations
								</div>
							</div>
							<div className="score-style">
								You've scored {score} out of{" "}
								{props.qSize}
							</div>
						</div>
					)}
				</div>
			}
		</div>
	);
}

export default McqCard;
