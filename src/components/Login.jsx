import { useState } from "react";

const Login = ({ onSubmit, onRegister, loading, error, message }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div style={{ display: "flex", gap: 8 }}>
        <button
          disabled={loading}
          onClick={() => onSubmit?.({ username, password })}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          disabled={loading}
          onClick={() => onRegister?.({ username, password })}
        >
          Register
        </button>
      </div>

      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      {message ? <p style={{ color: "green" }}>{message}</p> : null}
    </div>
  );
};

export default Login;
