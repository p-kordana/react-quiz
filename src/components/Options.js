import { useQuiz } from "../contexts/QuizContext";

function Options() {
  const { currentQuestion, answer, provideAnswer } = useQuiz();

  return (
    <div className="options">
      {currentQuestion.options.map((o, i) => (
        <button
          className={`btn btn-option ${i === answer && "answer"} ${
            answer !== null && i === answer
              ? i === currentQuestion.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={o}
          disabled={answer !== null}
          onClick={() => provideAnswer(i)}
        >
          {i + 1}. {o}
        </button>
      ))}
    </div>
  );
}

export default Options;
