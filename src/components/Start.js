import { useQuiz } from "../contexts/QuizContext";

function Start() {
  const { countQuestions, startQuiz } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{countQuestions} questions to test your skills.</h3>
      <button className="btn btn-ui" onClick={startQuiz}>
        Get started
      </button>
    </div>
  );
}

export default Start;
