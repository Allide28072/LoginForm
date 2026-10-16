import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const features = [
  {
    icon: "▣",
    title: "Clean page structure",
    text: "Every page shares the same navigation, layout and footer, so the site stays consistent as it grows.",
    to: "/about",
    linkLabel: "Learn more",
  },
  {
    icon: "✦",
    title: "Validated forms",
    text: "The login and contact forms check input in the browser and explain every problem next to the field.",
    to: "/login",
    linkLabel: "Try the login form",
  },
  {
    icon: "◷",
    title: "Helpful support",
    text: "A searchable help center answers the most common questions about the project and its features.",
    to: "/help",
    linkLabel: "Visit help center",
  },
];

export default function Home() {
  usePageTitle("Home");

  return (
    <div className="home-page">
      <section className="welcome">
        <p className="welcome-overline">WELCOME</p>

        <h1 className="welcome-title">
          Welcome <span>Ru.ju.gi.ra</span>
        </h1>

        <p className="welcome-text">on ur site</p>
      </section>

      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">
            <span className="live-dot" aria-hidden="true" />
            REACT + VITE DEMO PROJECT
          </span>

          <h1>
            A friendly home for
            <br />
            <span>your account.</span>
          </h1>

          <p className="hero-description">
            LoginForm is a small but complete React website. It
            demonstrates routing, reusable components, responsive
            layouts and client-side form validation.
          </p>

          <div className="hero-actions">
            <Link to="/login" className="button button-primary">
              Sign in <span>→</span>
            </Link>
            <Link to="/contact" className="button button-outline">
              Get in touch
            </Link>
          </div>

          <div className="hero-trust">
            <span className="check-circle" aria-hidden="true">✓</span>
            <span>Responsive layout</span>
            <span className="trust-divider" aria-hidden="true">•</span>
            <span className="check-circle" aria-hidden="true">✓</span>
            <span>Accessible forms</span>
            <span className="trust-divider" aria-hidden="true">•</span>
            <span className="check-circle" aria-hidden="true">✓</span>
            <span>No tracking</span>
          </div>
        </div>

        <div className="hero-art">
          <div className="art-glow" aria-hidden="true" />

          <div className="code-card">
            <div className="code-topbar">
              <div className="window-controls" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <span>
                LoginForm<span className="file-type">.jsx</span>
              </span>
            </div>

            <div className="code-body">
              <div>
                <span className="line">1</span>
                <span className="purple">export default function</span>{" "}
                <span className="yellow">LoginForm</span>() {"{"}
              </div>
              <div>
                <span className="line">2</span>
                {"  "}
                <span className="purple">const</span> [email, setEmail] ={" "}
                <span className="blue">useState</span>(
                <span className="green">""</span>);
              </div>
              <div>
                <span className="line">3</span>
                {"  "}
                <span className="purple">const</span> [password, setPassword] ={" "}
                <span className="blue">useState</span>(
                <span className="green">""</span>);
              </div>
              <div className="code-space" />
              <div>
                <span className="line">4</span>
                {"  "}
                <span className="purple">function</span>{" "}
                <span className="yellow">handleSubmit</span>(event) {"{"}
              </div>
              <div>
                <span className="line">5</span>
                {"    "}event.<span className="blue">preventDefault</span>();
              </div>
              <div>
                <span className="line">6</span>
                {"    "}
                <span className="pink">validate</span>({"{"} email, password {"}"});
              </div>
              <div>
                <span className="line">7</span>
                {"  "}
                {"}"}
              </div>
              <div>
                <span className="line">8</span>
                <span className="purple">return</span> {"<"}form{" />"};
              </div>
              <div>
                <span className="line">9</span>
                {"}"}
              </div>
            </div>

            <div className="code-status">
              <span>
                <i aria-hidden="true" />
                Ready
              </span>
              <span>React 19 · Vite</span>
            </div>
          </div>

          <div className="floating-note">
            <span className="note-icon" aria-hidden="true">✓</span>
            <div>
              <strong>Validation passed</strong>
              <span>Inline errors for every field</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <div>
            <span className="section-label">WHAT'S INSIDE</span>
            <h2>Built from simple, reusable parts.</h2>
          </div>
          <p>
            Three ideas shape this demo: clear structure, careful
            validation and friendly documentation.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-top">
                <span className="feature-icon" aria-hidden="true">
                  {feature.icon}
                </span>
                <span className="feature-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3>{feature.title}</h3>
              <p>{feature.text}</p>

              <Link to={feature.to} className="feature-link">
                {feature.linkLabel} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div>
          <span className="section-label">GET STARTED</span>
          <h2>Ready to look around?</h2>
          <p>Open the login form or send us a message.</p>
        </div>
        <Link to="/login" className="button button-white">
          Go to login <span>→</span>
        </Link>
      </section>
    </div>
  );
}
