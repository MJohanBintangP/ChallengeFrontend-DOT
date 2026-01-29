import { useEffect } from "react";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { useQuiz } from "./hooks/useQuiz";

function App() {
  const {
    state,
    login,
    register,
    resume,
    canResume,
    authLoading,
    authError,
    authMessage,
    answerQuestion,
    tick,
    restart,
    logout,
  } = useQuiz();

  useEffect(() => {
    if (!state.showResult && state.isLoggedIn && state.questions.length > 0) {
      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    }
  }, [state.showResult, state.isLoggedIn, state.questions.length, tick]);

  if (!state.isLoggedIn) {
    return (
      <Login
        onSubmit={login}
        onRegister={register}
        onResume={resume}
        canResume={canResume}
        loading={authLoading}
        error={authError}
        message={authMessage}
      />
    );
  }

  if (state.showResult) {
    return <Result state={state} onRestart={restart} onLogout={logout} />;
  }

  return <Quiz state={state} onAnswer={answerQuestion} />;
}

export default App;
