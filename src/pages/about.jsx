import { Link } from "react-router-dom";

const skills = [
  "HTML & CSS",
  "JavaScript",
  "React",
  "Responsive Design",
  "Git & GitHub",
  "UI Development",
];

export default function About() {
  return (
    <div className="page-container">
      <section className="page-hero">
        <span className="section-label">GET TO KNOW US</span>
        <h1>Good design.<br /><span>Thoughtful development.</span></h1>
        <p>
          We believe great websites combine useful functionality,
          clear design, and code that is easy to maintain.
        </p>
      </section>

      <section className="about-grid">
        <article className="content-card about-main">
          <div className="large-symbol">&lt;/&gt;</div>
          <h2>About this project</h2>
          <p>
            LoginForm is a learning project built with React and
            Vite. It demonstrates how a website can be organized
            into reusable components and separate pages.
          </p>
          <p>
            The goal is to practice frontend development while
            creating a clean, accessible, and responsive user
            experience.
          </p>
        </article>

        <article className="content-card">
          <span className="section-label">OUR APPROACH</span>
          <h2>Built around the basics.</h2>
          <ul className="check-list">
            <li><span>✓</span> Simple, clear navigation</li>
            <li><span>✓</span> Reusable React components</li>
            <li><span>✓</span> Responsive page layouts</li>
            <li><span>✓</span> Readable, organized code</li>
          </ul>
        </article>
      </section>

      <section className="skills-section">
        <span className="section-label">TECHNOLOGIES & SKILLS</span>
        <h2>The tools behind the site.</h2>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-chip" key={skill}>
              <span>✦</span> {skill}
            </div>
          ))}
        </div>
      </section>

      <section className="simple-cta">
        <div>
          <h2>Want to know more?</h2>
          <p>We are happy to hear from you.</p>
        </div>
        <Link to="/contact" className="button button-primary">
          Contact us →
        </Link>
      </section>
    </div>
  );
}