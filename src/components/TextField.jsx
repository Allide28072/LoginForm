export default function TextField({
  id,
  label,
  error,
  labelAction,
  as = "input",
  ...inputProps
}) {
  const Element = as === "textarea" ? "textarea" : "input";
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="field">
      {labelAction ? (
        <div className="password-label">
          <label htmlFor={id}>{label}</label>
          {labelAction}
        </div>
      ) : (
        <label htmlFor={id}>{label}</label>
      )}

      <Element
        id={id}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={errorId}
        {...inputProps}
      />

      {error && (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
