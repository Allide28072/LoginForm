import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Page not found");

  return (
    <div className="not-found">
      <span aria-hidden="true">404</span>
      <h1>Page not found</h1>
      <p>
        The page you are looking for does not exist or may have been
        moved. Head back to the homepage to keep exploring.
      </p>
      <Link to="/" className="button button-primary">
        Back to home <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
