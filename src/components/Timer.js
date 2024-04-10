import { useEffect, useState } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
  const { initialSeconds, endQuiz } = useQuiz();
  const [secondsRemaining, setSecondsRemaing] = useState(initialSeconds);

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        if (secondsRemaining <= 0) {
          endQuiz();
        }
        setSecondsRemaing((c) => c - 1);
      }, 1000);

      return () => clearInterval(id);
    },
    [secondsRemaining, endQuiz]
  );

  return (
    <div className="timer">
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
