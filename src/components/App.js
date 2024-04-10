import Header from "./Header";
import Main from "./Main";
import { QuizProvider } from "../contexts/QuizContext";

function App() {
  return (
    <QuizProvider>
      <div className="app">
        <Header />
        <Main />
      </div>
    </QuizProvider>
  );
}

export default App;
