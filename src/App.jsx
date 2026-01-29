import { useEffect } from "react";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { useQuiz } from "./hooks/useQuiz";

function App() {
  const { state, login, answerQuestion, tick, restart } = useQuiz();

  useEffect(() => {
    if (!state.showResult && state.isLoggedIn && state.questions.length > 0) {
      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    }
  }, [state.showResult, state.isLoggedIn, state.questions.length, tick]);

  if (!state.isLoggedIn) {
    return <Login onLogin={login} />;
  }

  if (state.showResult) {
    return <Result state={state} onRestart={restart} />;
  }

  return <Quiz state={state} onAnswer={answerQuestion} />;
}

export default App;
