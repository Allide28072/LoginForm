import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Help from "./pages/help";
import "./App.css";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<h1>404 - Page not found</h1>} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-about">
            <Link to="/" className="footer-brand">
              <span className="brand-icon">L</span>
              <span>LoginForm<span className="brand-dot">.</span></span>
            </Link>
            <p>Simple, modern web experiences built with React.</p>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/help">Help</Link>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a href="mailto:Karangwa@gmail.com">Karangwa@gmail.com</a>
            <a href="tel:+250798917894">+250 798 917 894</a>
            <Link to="/contact">Send a message</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 LoginForm</span>
        </div>
      </footer>
    </>
  );
}