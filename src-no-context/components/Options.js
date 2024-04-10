function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((o, i) => (
        <button
          className={`btn btn-option ${i === answer && "answer"} ${
            answer !== null && i === answer
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={o}
          disabled={answer !== null}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
        >
          {i + 1}. {o}
        </button>
      ))}
    </div>
  );
}

export default Options;
