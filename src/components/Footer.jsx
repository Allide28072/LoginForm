import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-about">
          <Link to="/" className="footer-brand">
            <span className="brand-icon">L</span>
            <span>LoginForm<span className="brand-dot">.</span></span>
          </Link>
          <p>Simple, modern web experiences built with React.</p>
        </div>

        <nav className="footer-col" aria-label="Explore">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/help">Help</Link>
        </nav>

        <nav className="footer-col" aria-label="Contact">
          <h4>Contact</h4>
          <a href="mailto:Karangwa@gmail.com">Karangwa@gmail.com</a>
          <a href="tel:+250798917894">+250 798 917 894</a>
          <Link to="/contact">Send a message</Link>
        </nav>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} LoginForm</span>
      </div>
    </footer>
  );
}
