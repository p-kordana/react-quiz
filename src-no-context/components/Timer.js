import { useEffect, useState } from "react";

function Timer({ initialSeconds, dispatch }) {
  const [secondsRemaining, setSecondsRemaing] = useState(initialSeconds);

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        if (secondsRemaining <= 0) return dispatch({ type: "finishQuiz" });
        setSecondsRemaing((c) => c - 1);
      }, 1000);

      return () => clearInterval(id);
    },
    [secondsRemaining, dispatch]
  );

  return (
    <div className="timer">
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
