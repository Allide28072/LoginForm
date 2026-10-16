const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(value.trim());
}

export function validateLogin({ email, password }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Please enter your password.";
  } else if (password.length < 6) {
    errors.password = "Your password must be at least 6 characters.";
  }

  return errors;
}

export function validateContact({ name, email, subject, message }) {
  const errors = {};

  if (!name.trim()) {
    errors.name = "Please enter your full name.";
  }

  if (!email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!subject.trim()) {
    errors.subject = "Please add a subject.";
  }

  if (!message.trim()) {
    errors.message = "Please write your message.";
  }

  return errors;
}

export function firstError(errors) {
  return Object.values(errors)[0] ?? "";
}
