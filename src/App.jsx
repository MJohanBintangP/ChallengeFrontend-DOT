import { useEffect, useState } from "react";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { useQuiz } from "./hooks/useQuiz";

function App() {
  const {
    state,
    login,
    register,
    canResume,
    resume,
    startQuiz,
    authLoading,
    authError,
    authMessage,
    answerQuestion,
    tick,
    restart,
    logout,
  } = useQuiz();

  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!state.showResult && state.isLoggedIn && state.questions.length > 0) {
      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    }
  }, [state.showResult, state.isLoggedIn, state.questions.length, tick]);

  if (!state.isLoggedIn) {
    return (
      <Login
        mode={mode}
        username={username}
        password={password}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onToggleMode={() =>
          setMode((m) => (m === "login" ? "register" : "login"))
        }
        onSubmit={login}
        onRegister={register}
        loading={authLoading}
        error={authError}
        message={authMessage}
      />
    );
  }

  if (state.showResult) {
    return <Result state={state} onRestart={restart} onLogout={logout} />;
  }

  return (
    <Quiz
      state={state}
      onAnswer={answerQuestion}
      onRetry={startQuiz}
      onStart={startQuiz}
      canResume={canResume}
      onResume={resume}
      onLogout={logout}
    />
  );
}

export default App;
