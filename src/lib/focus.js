export function focusFirstInvalid(errors, fieldIds) {
  const firstField = Object.keys(fieldIds).find((field) => errors[field]);

  if (firstField) {
    document.getElementById(fieldIds[firstField])?.focus();
  }
}
