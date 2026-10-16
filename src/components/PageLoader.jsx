export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span className="spinner spinner-dark" aria-hidden="true" />
      <span className="visually-hidden">Loading page</span>
    </div>
  );
}
