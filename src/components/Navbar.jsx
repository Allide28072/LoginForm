import { NavLink, Link } from "react-router-dom";

const links = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Help", path: "/help" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-icon">L</span>
          <span>LoginForm<span className="brand-dot">.</span></span>
        </Link>

        <nav className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/login" className="nav-login">
          Sign in <span>↗</span>
        </Link>
      </div>
    </header>
  );
}