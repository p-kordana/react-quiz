import { useQuiz } from "../contexts/QuizContext";

import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finish from "./Finish";
import FinishButton from "./FinishButton";
import Timer from "./Timer";

function Main() {
  const { status, answer, qIndex, countQuestions } = useQuiz();

  return (
    <main className="main">
      {status === "error" && <Error />}
      {status === "loading" && <Loader />}
      {status === "ready" && <Start />}
      {status === "active" && (
        <>
          <Progress />
          <Question />
          <footer>
            <Timer />
            {answer === null ? (
              <></>
            ) : qIndex + 1 < countQuestions ? (
              <NextButton />
            ) : (
              <FinishButton />
            )}
          </footer>
        </>
      )}
      {status === "finished" && <Finish />}
    </main>
  );
}

export default Main;
