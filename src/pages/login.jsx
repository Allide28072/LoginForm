import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import { validateLogin } from "../lib/validation";

export default function Login() {
  usePageTitle("Sign in");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submitTimer = useRef(null);

  useEffect(() => () => clearTimeout(submitTimer.current), []);

  function clearFieldError(field) {
    setErrors((previous) => ({ ...previous, [field]: "" }));
    setSuccess(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setNotice("");
    setSuccess(false);

    const nextErrors = validateLogin({ email, password });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    submitTimer.current = setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 700);
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

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? "login-email-error" : undefined}
              onChange={(event) => {
                setEmail(event.target.value);
                clearFieldError("email");
              }}
            />
            {errors.email && (
              <p className="field-error" id="login-email-error">
                {errors.email}
              </p>
            )}
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
              aria-invalid={errors.password ? "true" : undefined}
              aria-describedby={
                errors.password ? "login-password-error" : undefined
              }
              onChange={(event) => {
                setPassword(event.target.value);
                clearFieldError("password");
              }}
            />
            {errors.password && (
              <p className="field-error" id="login-password-error">
                {errors.password}
              </p>
            )}
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
              onClick={() => {
                setErrors({});
                setSuccess(false);
                setNotice("Password recovery is not connected yet.");
              }}
            >
              Forgot password?
            </button>
          </div>

          {notice && <p className="form-message">{notice}</p>}
          {success && (
            <p className="form-message success" role="status">
              Form validated successfully. Authentication is not
              connected yet.
            </p>
          )}

          <button
            className="button button-primary form-submit"
            type="submit"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              <>Sign in <span>→</span></>
            )}
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
