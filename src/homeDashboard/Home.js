import { default as React } from "react";
import { NavLink } from "react-router-dom";
import "../homeDashboard/Home.css";

function Home() {
	return (
		<div>
			<div className="hr-align">
				<NavLink to="/create-quiz">
					<div className="card-layout">
						<div className="new-quiz-card" id="create_card">
							<div className="tx-align">
								Create New Quiz
							</div>
						</div>
					</div>
				</NavLink>
				<NavLink to="/my-quiz">
					<div className="card-layout">
						<div className="new-quiz-card" id="view_card">
							<div className="tx-align">My Quizes</div>
						</div>
					</div>
				</NavLink>
			</div>
		</div>
	);
}

export default Home;
