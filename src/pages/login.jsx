import { useState } from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import { firstError, validateLogin } from "../lib/validation";

export default function Login() {
  usePageTitle("Sign in");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess(false);

    const message = firstError(validateLogin({ email, password }));

    if (message) {
      setError(message);
      return;
    }

    setSuccess(true);
  }

  return (
    <div className="login-page">
      <section className="login-card">
        <div className="login-logo">L<span>.</span></div>

        <span className="section-label">WELCOME BACK</span>
        <h1>Sign in to your account</h1>
        <p className="login-intro">
          Enter your details below to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
                setSuccess(false);
              }}
              required
            />
          </div>

          <div className="field">
            <div className="password-label">
              <label htmlFor="login-password">Password</label>
              <button
                type="button"
                className="text-button"
                onClick={() => setShowPassword((previous) => !previous)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
                setSuccess(false);
              }}
              required
            />
          </div>

          <div className="login-options">
            <label className="remember-option">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-button"
              onClick={() =>
                setError("Password recovery is not connected yet.")
              }
            >
              Forgot password?
            </button>
          </div>

          {error && <p className="form-message error">{error}</p>}
          {success && (
            <p className="form-message success">
              Form validated successfully. Authentication is not
              connected yet.
            </p>
          )}

          <button className="button button-primary form-submit" type="submit">
            Sign in <span>→</span>
          </button>
        </form>

        <div className="login-divider"><span>OR</span></div>

        <p className="login-bottom">
          Need help? <Link to="/help">Visit the help center</Link>
        </p>
        <p className="login-bottom">
          New here? <Link to="/contact">Get in touch</Link>
        </p>
      </section>
    </div>
  );
}