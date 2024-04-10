import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finish from "./Finish";
import FinishButton from "./FinishButton";
import Timer from "./Timer";

const initialState = {
  questions: [],
  qIndex: 0,
  // loading, error, ready, active, finished
  status: "",
  answer: null,
  points: 0,
  highscore: 0,
  initialSeconds: 0,
};

const SECS_PER_QUESTION = 5;

function reducer(state, action) {
  switch (action.type) {
    // set loading state
    case "loading":
      return {
        ...state,
        status: "loading",
      };
    // set ready state after successful data retrieval
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    // set error state upon failed data retrieval
    case "dataError":
      return { ...state, status: "error" };
    // set active state after start quiz
    case "start":
      return {
        ...state,
        status: "active",
        initialSeconds: state.questions.length * SECS_PER_QUESTION,
      };
    // update selected answer upon new choice
    case "newAnswer":
      const question = state.questions.at(state.qIndex);
      const isCorrect = question.correctOption === action.payload;
      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
      };
    // move index to next question and reset selected answer state
    case "nextQuestion":
      return {
        ...state,
        qIndex: state.qIndex + 1,
        answer: null,
      };
    // change status upon quiz completion
    case "finishQuiz":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    // allow return to start screen and reset some state variables
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    default:
      throw new Error("ACtion undefined");
  }
}

function App() {
  const [
    { questions, qIndex, status, answer, points, highscore, initialSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);
  const countQuestions = questions.length;
  const maxPoints = questions.reduce((a, c) => a + c.points, 0);

  useEffect(function () {
    dispatch({ type: "loading" });
    fetch("http://localhost:8083/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataError" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "error" && <Error />}
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <Start numQuestions={countQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              qAt={qIndex}
              qOf={countQuestions}
              pAt={points}
              pOf={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[qIndex]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer initialSeconds={initialSeconds} dispatch={dispatch} />
              {answer === null ? (
                <></>
              ) : qIndex + 1 < countQuestions ? (
                <NextButton dispatch={dispatch} />
              ) : (
                <FinishButton dispatch={dispatch} />
              )}
            </footer>
          </>
        )}
        {status === "finished" && (
          <Finish
            pAt={points}
            pOf={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
