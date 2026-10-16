const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EMAIL_MAX_LENGTH = 254;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 128;
export const NAME_MAX_LENGTH = 80;
export const SUBJECT_MAX_LENGTH = 120;
export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 1000;

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(value.trim());
}

function validateEmailField(errors, email, invalidMessage) {
  if (!email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(email)) {
    errors.email = invalidMessage;
  } else if (email.trim().length > EMAIL_MAX_LENGTH) {
    errors.email =
      `Your email address must be at most ${EMAIL_MAX_LENGTH} characters.`;
  }
}

export function validateLogin({ email, password }) {
  const errors = {};

  validateEmailField(errors, email, "Enter a valid email address.");

  if (!password) {
    errors.password = "Please enter your password.";
  } else if (password.length < PASSWORD_MIN_LENGTH) {
    errors.password =
      `Your password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  } else if (password.length > PASSWORD_MAX_LENGTH) {
    errors.password =
      `Your password must be at most ${PASSWORD_MAX_LENGTH} characters.`;
  }

  return errors;
}

export function validateContact({ name, email, subject, message }) {
  const errors = {};

  if (!name.trim()) {
    errors.name = "Please enter your full name.";
  }

  validateEmailField(errors, email, "Please enter a valid email address.");

  if (!subject.trim()) {
    errors.subject = "Please add a subject.";
  }

  if (!message.trim()) {
    errors.message = "Please write your message.";
  } else if (message.trim().length < MESSAGE_MIN_LENGTH) {
    errors.message =
      `Your message must be at least ${MESSAGE_MIN_LENGTH} characters.`;
  } else if (message.trim().length > MESSAGE_MAX_LENGTH) {
    errors.message =
      `Your message must be at most ${MESSAGE_MAX_LENGTH} characters.`;
  }

  return errors;
}
