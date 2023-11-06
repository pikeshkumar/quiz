import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateQuiz from "./createQuiz/CreateQuiz";
import Header from "./Header/Header";
import Home from "./homeDashboard/Home";
import MyQuizes from "./myQuizes/MyQuizes";
import PlayQuiz from "./playQuiz/PlayQuiz";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/create-quiz" element={<CreateQuiz />} />
				<Route path="/my-quiz" element={<MyQuizes />} />
				<Route path="/play-quiz/:key" element={<PlayQuiz />} />
			</Routes>
		</Router>
	);
}

export default App;
