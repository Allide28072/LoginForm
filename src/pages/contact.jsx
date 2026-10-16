import { useEffect, useRef, useState } from "react";
import usePageTitle from "../hooks/usePageTitle";
import { validateContact } from "../lib/validation";
import TextField from "../components/TextField";

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
            <TextField
              id="contact-name"
              label="Full name *"
              name="name"
              value={form.name}
              error={errors.name}
              onChange={handleChange}
              placeholder="Your name"
              autoComplete="name"
            />

            <TextField
              id="contact-email"
              label="Email address *"
              name="email"
              type="email"
              value={form.email}
              error={errors.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <TextField
            id="contact-subject"
            label="Subject *"
            name="subject"
            value={form.subject}
            error={errors.subject}
            onChange={handleChange}
            placeholder="What is this about?"
          />

          <TextField
            id="contact-message"
            label="Message *"
            name="message"
            as="textarea"
            value={form.message}
            error={errors.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            rows={5}
          />

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