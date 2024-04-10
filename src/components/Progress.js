import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { qIndex, countQuestions, answer, points, maxPoints } = useQuiz();

  return (
    <header className="progress">
      <progress max={countQuestions} value={qIndex + Number(answer !== null)} />
      <p>
        Question <strong>{qIndex + 1}</strong> / {countQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints} points
      </p>
    </header>
  );
}

export default Progress;
