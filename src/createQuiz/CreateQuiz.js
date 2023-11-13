import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
// import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import QuizCard from "../components/quiz-card/QuizCard";
import "../createQuiz/CreateQuiz.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

// const tempOption = ["nitesh1", "kumar0", "sharma0", "ok0"];
function CreateQuiz() {
  const [open, setOpen] = useState(false);
  const [optionList, setOptionList] = useState([]);
  const [option, setOption] = useState("");
  const handleClose = () => setOpen(false);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [optionField, setOptionField] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const [questionType, setQuestionType] = useState("single");
  const [answerChecked, setAnswerChecked] = useState(false);
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    question: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    question: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });

    // Perform validation for each input field
    if (name === "title") {
      if (value.trim().length < 10 || value.trim().length > 30) {
        setErrors({
          ...errors,
          title:
            "Username must be at least 10 characters and at max 30 characters",
        });
      } else {
        setErrors({ ...errors, title: "" });
      }
    } else if (name === "description") {
      // Add email validation logic here
      if (value.trim().length < 10 || value.trim().length > 200) {
        setErrors({
          ...errors,
          description:
            "Description must be at least 10 characters and at max 200 characters",
        });
      } else {
        setErrors({ ...errors, description: "" });
      }
    } else if (name === "question") {
      // Add password validation logic here
      if (value.trim().length < 10 || value.trim().length > 200) {
        setErrors({
          ...errors,
          question:
            "Question must be at least 10 characters and at max 200 characters",
        });
      } else {
        setErrors({ ...errors, question: "" });
      }
    }
  };

  useEffect(() => {
    setOpen(true);
  }, []);
  // const getOptionValue = (val) => {
  // 	setOption(val);
  // };

  const getOptionType = (e) => {
    var isChecked = e.target.checked;
    setAnswerChecked(isChecked);
  };
  const getOption = (e) => {
    setOptionField(e.target.value);
  };

  const addOption = () => {
    setAnswerChecked(false);
    if (optionField.trim().length > 0 && answerChecked) {
      setOptionList((preOptionList) => [...preOptionList, optionField + 1]);
      setCorrectAnswer((pre) => pre + 1);
    } else if (optionField.trim().length > 0 && !answerChecked) {
      setOptionList((preOptionList) => [...preOptionList, optionField + 0]);
    }

    // if (
    // 	optionField.trim().length > 0 &&
    // 	answerChecked &&
    // 	questionType === "single"
    // ) {
    // 	setOptionList((preOptionList) => [
    // 		...preOptionList,
    // 		optionField + 1,
    // 	]);
    // 	setCheckboxCount(checkboxCount + 1);
    // }
    // else if (checkboxCount === 1 && questionType === "single") {
    // 	setOptionList((preOptionList) => [
    // 		...preOptionList,
    // 		optionField + 0,
    // 	]);
    // } else if (
    // 	optionField.trim().length > 0 &&
    // 	answerChecked &&
    // 	questionType !== "single"
    // ) {
    // 	setOptionList((preOptionList) => [
    // 		...preOptionList,
    // 		optionField + 1,
    // 	]);
    // } else {
    // 	setOptionList((preOptionList) => [
    // 		...preOptionList,
    // 		optionField + 0,
    // 	]);
    // }
    setOptionField("");
  };
  const addQuestion = () => {
    if (inputValues.question.trim().length > 0 && optionList.length > 0) {
      if (
        (questionType === "single" &&
          (correctAnswer === 0 || correctAnswer > 1)) ||
        (questionType !== "single" && correctAnswer === 0)
      ) {
        Swal.fire({
          title: "Error!",
          text:
            questionType !== "single"
              ? `Atleast one correct answer required to save question`
              : `${correctAnswer}one correct answer required to save question`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        setQuestionList((prevQuestionList) => [
          ...prevQuestionList,
          {
            question: inputValues.question,
            option: optionList,
          },
        ]);
        setInputValues({
          ...inputValues,
          question: "",
        });
        setOptionList([]);
        setCorrectAnswer(0);
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "Atleast two option required to save question",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const deleteOption = (e) => {
    // console.log(e.correct_answer);

    if (e.correct_answer) {
      setCorrectAnswer((pre) => pre - 1);
    }
    const updatedOptionList = optionList.filter((option) => option !== e.value);
    setOptionList(updatedOptionList);
  };

  const saveQuestion = () => {
    addQuestion();

    setQuestionList((questionList) => {
      if (
        questionList.length > 0 &&
        !errors.title.trim().length &&
        inputValues.title.trim().length > 0 &&
        !errors.description.trim().length &&
        inputValues.description.trim().length > 0
      ) {
        var mcq_list = {
          qList: questionList,
          title: inputValues.title,
          description: inputValues.description,
          date: Date(),
          questionType: questionType,
          active: true,
        };
        if (questionType === "single") {
          localStorage.setItem(
            (inputValues.title + 1).toString(),
            JSON.stringify(mcq_list)
          );
        } else if (questionType === "multi") {
          localStorage.setItem(
            (inputValues.title + 2).toString(),
            JSON.stringify(mcq_list)
          );
        } else if (questionType === "short") {
          localStorage.setItem(
            (inputValues.title + 3).toString(),
            JSON.stringify(mcq_list)
          );
        } else {
          localStorage.setItem(
            (inputValues.title + 4).toString(),
            JSON.stringify(mcq_list)
          );
        }
        setInputValues({
          ...inputValues,
          title: "",
          description: "",
        });
        setQuestionType("single");
        // Swal.fire({
        // 	position: "center",
        // 	icon: "success",
        // 	title: "Question Created Successfully",
        // 	showConfirmButton: false,
        // 	timer: 1500,
        // });

        Swal.fire({
          title: "Question Created Successfully",
          // text: "You won't be able to revert this!",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "View All Question",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/my-quiz"); // Navigate to the '/about' route
            // Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      }
      return [];
    });
  };

  return (
    <>
      <div className="dashboard-layout">
        <div className="title-style">Create New Quiz</div>
        <form>
          <div className="quiz-body">
            <div>
              <div className="dashboard">
                <TextField
                  id="standard-basic"
                  label="Title*"
                  variant="standard"
                  type="text"
                  name="title"
                  onChange={handleInputChange}
                  value={inputValues.title}
                />
                {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
                <TextField
                  label="Description*"
                  variant="standard"
                  id="standard-basic"
                  type="text"
                  name="description"
                  onChange={handleInputChange}
                  value={inputValues.description}
                />
                {errors.description && (
                  <p style={{ color: "red" }}>{errors.description}</p>
                )}
              </div>
              <div className="q-number">
                Total Questions : {questionList.length}
              </div>
              <TextField
                id="standard-basic"
                type="text"
                name="question"
                label="Question*"
                variant="standard"
                onChange={handleInputChange}
                value={inputValues.question}
              />
              {errors.question && (
                <p style={{ color: "red" }}>{errors.question}</p>
              )}
              {/* option input field */}
              <div>
                <div className="answer-layout w60">
                  <div>
                    <div className="q-card">
                      <TextField
                        id="standard-basic"
                        label="Add Answer"
                        variant="standard"
                        className="w100"
                        value={optionField}
                        onChange={getOption}
                      />
                      <div>
                        <IconButton aria-label="add button" onClick={addOption}>
                          <AddIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div
                      className={
                        answerChecked ? "answer-checkbox" : "answer-unchecked"
                      }
                    >
                      Correct Answer
                      <Checkbox
                        color="success"
                        onChange={getOptionType}
                        checked={answerChecked}
                        // disabled={
                        // 	checkboxCount ===
                        // 		0 &&
                        // 	questionType ===
                        // 		"single"
                        // 		? false
                        // 		: checkboxCount ===
                        // 				1 &&
                        // 		  questionType ===
                        // 				"single"
                        // 		? false
                        // 		: false
                        // }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="q-card">
                {optionList.map((val, index) => (
                  <div key={index}>
                    <QuizCard data={val} deleteOption={deleteOption} />
                  </div>
                ))}
              </div>

              <div className="q-button">
                <Button
                  variant="outlined"
                  onClick={addQuestion}
                  disabled={
                    inputValues.question.trim().length >= 10 &&
                    inputValues.question.trim().length <= 200 &&
                    optionList.length >= 2
                      ? false
                      : true
                  }
                >
                  <AddIcon />
                  Add Question
                </Button>
              </div>
            </div>
          </div>

          <div className="save-button">
            <Button
              variant="contained"
              size="large"
              onClick={saveQuestion}
              disabled={
                questionList.length > 0 &&
                inputValues.title.trim().length >= 10 &&
                inputValues.title.trim().length <= 30 &&
                inputValues.description.trim().length >= 10 &&
                inputValues.description.trim().length <= 200
                  ? false
                  : true
              }
            >
              Save
            </Button>
          </div>
        </form>

        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <div className="title">
                <div className="q-title">Select Question Type</div>
                <div onClick={handleClose}>
                  <IconButton aria-label="delete">
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
              <div className="option-list">
                <Button
                  variant="contained"
                  className="button"
                  onClick={() => {
                    setQuestionType("single");
                    setOpen(false);
                  }}
                >
                  MCQ(Single correct)
                </Button>
                <Button
                  variant="contained"
                  className="button"
                  color="primary"
                  onClick={() => {
                    setQuestionType("multi");
                    setOpen(false);
                  }}
                >
                  MCQ(multi correct)
                </Button>
                <Button
                  variant="contained"
                  className="button"
                  onClick={() => {
                    setQuestionType("short");
                    setOpen(false);
                  }}
                >
                  Short Answer(with 2 words)
                </Button>
                <Button
                  variant="contained"
                  className="button"
                  onClick={() => {
                    setQuestionType("description");
                    setOpen(false);
                  }}
                >
                  Description(with 2 or 4 sentences)
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default CreateQuiz;
