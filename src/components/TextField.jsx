export default function TextField({
  id,
  label,
  error,
  hint,
  labelAction,
  as = "input",
  ...inputProps
}) {
  const Element = as === "textarea" ? "textarea" : "input";
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = errorId ?? hintId;

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
        aria-describedby={describedBy}
        {...inputProps}
      />

      {hint && !error && (
        <p className="field-hint" id={hintId}>
          {hint}
        </p>
      )}

      {error && (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
