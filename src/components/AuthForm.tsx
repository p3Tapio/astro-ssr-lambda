import { useState } from "react";
import "./AuthForm.scss";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    await fetch("https://httpbin.org/status/200,401")
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <div className="auth-form__buttons">
          <button
            className="outline secondary"
            type="reset"
            disabled={email === "" || password === ""}
            onClick={() => {
              setEmail("");
              setPassword("");
            }}
          >
            Reset
          </button>
          <button
            className="outline contrast"
            type="submit"
            disabled={email === "" || password === ""}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
