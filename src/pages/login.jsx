import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import { validateLogin } from "../lib/validation";
import TextField from "../components/TextField";

const fieldIds = {
  email: "login-email",
  password: "login-password",
};

function focusFirstInvalid(errors) {
  const firstField = Object.keys(fieldIds).find((field) => errors[field]);

  if (firstField) {
    document.getElementById(fieldIds[firstField])?.focus();
  }
}

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
      focusFirstInvalid(nextErrors);
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

        <form
          onSubmit={handleSubmit}
          aria-label="Sign in form"
          aria-busy={submitting}
          noValidate
        >
          <TextField
            id="login-email"
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            error={errors.email}
            disabled={submitting}
            onChange={(event) => {
              setEmail(event.target.value);
              clearFieldError("email");
            }}
          />

          <TextField
            id="login-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            error={errors.password}
            disabled={submitting}
            labelAction={
              <button
                type="button"
                className="text-button"
                disabled={submitting}
                onClick={() => setShowPassword((previous) => !previous)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            }
            onChange={(event) => {
              setPassword(event.target.value);
              clearFieldError("password");
            }}
          />

          <div className="login-options">
            <label className="remember-option">
              <input
                type="checkbox"
                checked={remember}
                disabled={submitting}
                onChange={(event) => setRemember(event.target.checked)}
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-button"
              disabled={submitting}
              onClick={() => {
                setErrors({});
                setSuccess(false);
                setNotice("Password recovery is not connected yet.");
              }}
            >
              Forgot password?
            </button>
          </div>

          {notice && <p className="form-message notice">{notice}</p>}
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
