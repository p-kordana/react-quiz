import { useQuiz } from "../contexts/QuizContext";

function Finish() {
  const { points, maxPoints, highscore, restartQuiz } = useQuiz();
  const scorePct = (points / maxPoints) * 100;

  return (
    <>
      <p className="result">
        You scored {points} out of {maxPoints} ({Math.ceil(scorePct)}%)
      </p>
      <p className="highscore">Highest Score: {highscore} points</p>

      <button className="btn btn-ui start" onClick={restartQuiz}>
        Try again?
      </button>
    </>
  );
}

export default Finish;
