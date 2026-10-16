import { useState } from "react";
import usePageTitle from "../hooks/usePageTitle";
import { firstError, validateContact } from "../lib/validation";

export default function Contact() {
  usePageTitle("Contact");

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSent(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const message = firstError(validateContact(form));

    if (message) {
      setError(message);
      return;
    }

    setSent(true);
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
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

        <form className="form-card" onSubmit={handleSubmit}>
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
                required
              />
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
                required
              />
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
              required
            />
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
              required
            />
          </div>

          {error && <p className="form-message error">{error}</p>}
          {sent && (
            <p className="form-message success">
              Your message passed validation. This demo has not
              sent it to a server.
            </p>
          )}

          <button className="button button-primary form-submit" type="submit">
            Send message <span>→</span>
          </button>
        </form>
      </section>
    </div>
  );
}