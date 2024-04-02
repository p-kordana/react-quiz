function Finish({ pAt, pOf, highscore, dispatch }) {
  const scorePct = (pAt / pOf) * 100;

  return (
    <>
      <p className="result">
        You scored {pAt} out of {pOf} ({Math.ceil(scorePct)}%)
      </p>
      <p className="highscore">Highest Score: {highscore} points</p>

      <button
        className="btn btn-ui start"
        onClick={() => dispatch({ type: "restart" })}
      >
        Try again?
      </button>
    </>
  );
}

export default Finish;
