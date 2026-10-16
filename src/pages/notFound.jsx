import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Page not found");

  return (
    <div className="page-container">
      <section className="page-hero">
        <span className="section-label">ERROR 404</span>
        <h1>Page not<br /><span>found.</span></h1>
        <p>
          The page you are looking for does not exist or may have
          been moved. Head back to the homepage to keep exploring.
        </p>
        <Link to="/" className="button button-primary">
          Back to home <span>→</span>
        </Link>
      </section>
    </div>
  );
}
