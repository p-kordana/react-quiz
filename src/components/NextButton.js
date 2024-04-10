import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
  const { getNextQuestion } = useQuiz();
  return (
    <button className="btn btn-ui" onClick={getNextQuestion}>
      Next
    </button>
  );
}

export default NextButton;
