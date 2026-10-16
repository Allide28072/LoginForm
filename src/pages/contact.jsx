import { useEffect, useRef, useState } from "react";
import usePageTitle from "../hooks/usePageTitle";
import { validateContact } from "../lib/validation";

const emptyForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  usePageTitle("Contact");

  const [form, setForm] = useState(emptyForm);

  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const sendTimer = useRef(null);

  useEffect(() => () => clearTimeout(sendTimer.current), []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({ ...previous, [name]: "" }));
    setSent(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateContact(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSending(true);

    sendTimer.current = setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm(emptyForm);
    }, 700);
  }

  return (
    <div className="page-container">
      <section className="page-hero">
        <span className="section-label">CONTACT</span>
        <h1>Let's start a<br /><span>conversation.</span></h1>
        <p>
          Have a question, some feedback, or an idea?
          Send us a message using the form below.
        </p>
      </section>

      <section className="contact-layout">
        <aside className="contact-info">
          <div className="contact-info-icon">✉</div>
          <h2>We'd love to hear from you.</h2>
          <p>
            Complete the form and you'll see a confirmation
            when your message passes validation.
          </p>

          <div className="contact-detail">
            <span className="detail-icon">⌘</span>
            <div>
              <strong>Project</strong>
              <span>LoginForm website</span>
            </div>
          </div>

          <div className="contact-detail">
            <span className="detail-icon">◷</span>
            <div>
              <strong>Availability</strong>
              <span>Online project demo</span>
            </div>
          </div>

          <div className="contact-decoration">&lt;/&gt;</div>
        </aside>

        <form className="form-card" onSubmit={handleSubmit} noValidate>
          <div className="form-heading">
            <h2>Send a message</h2>
            <p>Fields marked with * are required.</p>
          </div>

          <div className="form-row">
            <div className="field">
              <label htmlFor="contact-name">Full name *</label>
              <input
                id="contact-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={errors.name ? "true" : undefined}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
              />
              {errors.name && (
                <p className="field-error" id="contact-name-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="contact-email">Email address *</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                aria-invalid={errors.email ? "true" : undefined}
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
              />
              {errors.email && (
                <p className="field-error" id="contact-email-error">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="contact-subject">Subject *</label>
            <input
              id="contact-subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="What is this about?"
              aria-invalid={errors.subject ? "true" : undefined}
              aria-describedby={
                errors.subject ? "contact-subject-error" : undefined
              }
            />
            {errors.subject && (
              <p className="field-error" id="contact-subject-error">
                {errors.subject}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="contact-message">Message *</label>
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows={5}
              aria-invalid={errors.message ? "true" : undefined}
              aria-describedby={
                errors.message ? "contact-message-error" : undefined
              }
            />
            {errors.message && (
              <p className="field-error" id="contact-message-error">
                {errors.message}
              </p>
            )}
          </div>

          {sent && (
            <p className="form-message success" role="status">
              Your message passed validation. This demo has not
              sent it to a server.
            </p>
          )}

          <button
            className="button button-primary form-submit"
            type="submit"
            disabled={sending}
          >
            {sending ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>Send message <span>→</span></>
            )}
          </button>
        </form>
      </section>
    </div>
  );
}