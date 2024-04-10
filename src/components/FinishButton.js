import { useQuiz } from "../contexts/QuizContext";

function FinishButton() {
  const { endQuiz } = useQuiz();
  return (
    <button className="btn btn-ui" onClick={endQuiz}>
      Finish
    </button>
  );
}

export default FinishButton;
