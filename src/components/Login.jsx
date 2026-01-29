import { useEffect, useState } from "react";
import { loadState } from "../store/localStorage";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [canResume, setCanResume] = useState(false);

  useEffect(() => {
    const checkResume = () => {
      const saved = loadState("quizState");
      setCanResume(
        Boolean(
          saved &&
          saved.isLoggedIn &&
          !saved.showResult &&
          saved.questions?.length > 0,
        ),
      );
    };
    checkResume();
    const interval = setInterval(checkResume, 1000);
    return () => clearInterval(interval);
  }, []);

  const saved = loadState("quizState");
  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={() => username && onLogin(username)}>Login</button>
      {canResume && (
        <button style={{ marginLeft: 8 }} onClick={() => onLogin(null)}>
          Lanjutkan Kuis Sebelumnya
        </button>
      )}
      <pre style={{ marginTop: 16, background: "#eee", fontSize: 12 }}>
        {JSON.stringify(saved, null, 2)}
      </pre>
    </div>
  );
};

export default Login;
