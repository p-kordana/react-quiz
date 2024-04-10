import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

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

const SECS_PER_QUESTION = 2;

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

function QuizProvider({ children }) {
  const [
    { questions, qIndex, status, answer, points, highscore, initialSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);
  const currentQuestion = questions[qIndex];
  const countQuestions = questions.length;
  const maxPoints = questions.reduce((a, c) => a + c.points, 0);

  useEffect(function () {
    dispatch({ type: "loading" });
    fetch("http://localhost:8083/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataError" }));
  }, []);

  function startQuiz() {
    dispatch({ type: "start" });
  }

  function provideAnswer(answer) {
    dispatch({ type: "newAnswer", payload: answer });
  }

  function getNextQuestion() {
    dispatch({ type: "nextQuestion" });
  }

  function endQuiz() {
    dispatch({ type: "finishQuiz" });
  }

  function restartQuiz() {
    dispatch({ type: "restart" });
  }

  return (
    <QuizContext.Provider
      value={{
        currentQuestion,
        qIndex,
        status,
        answer,
        points,
        highscore,
        initialSeconds,
        countQuestions,
        maxPoints,
        startQuiz,
        provideAnswer,
        getNextQuestion,
        endQuiz,
        restartQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext used outside of QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
