import { useState } from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const questions = [
  {
    question: "What is LoginForm?",
    answer:
      "LoginForm is a demonstration website built with React and Vite. It includes a homepage, About page, Contact page, Login page, and Help page.",
  },
  {
    question: "How do I navigate between pages?",
    answer:
      "Use the navigation links at the top of the website. React Router changes pages without requiring a full browser reload.",
  },
  {
    question: "Does the login form authenticate users?",
    answer:
      "Not yet. The current login page validates the input in your browser. Real authentication requires a backend or an authentication service.",
  },
  {
    question: "Does the contact form send an email?",
    answer:
      "No. The current form demonstrates validation and a confirmation message. To send real messages, connect it to a backend or email service.",
  },
  {
    question: "Can I customize this website?",
    answer:
      "Yes. You can change the colors, text, page content, and layout in the React components and CSS files.",
  },
];

export default function Help() {
  usePageTitle("Help center");

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="page-container">
      <section className="page-hero help-hero">
        <span className="section-label">HELP CENTER</span>
        <h1>How can we<br /><span>help you?</span></h1>
        <p>
          Find answers to common questions about the website,
          its pages, and its features.
        </p>
      </section>

      <section className="faq-section">
        <div className="faq-heading">
          <div>
            <span className="section-label">FREQUENTLY ASKED QUESTIONS</span>
            <h2>Questions, answered.</h2>
          </div>
          <span className="faq-count">{questions.length} articles</span>
        </div>

        <div className="faq-list">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article className={`faq-item ${isOpen ? "open" : ""}`} key={item.question}>
                <button
                  className="faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-toggle">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="simple-cta">
        <div>
          <h2>Still need help?</h2>
          <p>Send us a message and tell us what you need.</p>
        </div>
        <Link to="/contact" className="button button-primary">
          Contact support →
        </Link>
      </section>
    </div>
  );
}