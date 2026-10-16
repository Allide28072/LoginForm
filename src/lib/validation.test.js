import {
  isValidEmail,
  validateContact,
  validateLogin,
} from "./validation";

describe("isValidEmail", () => {
  it("accepts a well-formed address", () => {
    expect(isValidEmail("person@example.com")).toBe(true);
  });

  it("ignores surrounding whitespace", () => {
    expect(isValidEmail("  person@example.com  ")).toBe(true);
  });

  it.each(["plain", "missing@tld", "two@@example.com", ""])(
    "rejects %p",
    (value) => {
      expect(isValidEmail(value)).toBe(false);
    },
  );
});

describe("validateLogin", () => {
  it("returns no errors for valid credentials", () => {
    expect(
      validateLogin({ email: "person@example.com", password: "secret123" }),
    ).toEqual({});
  });

  it("requires an email and a password", () => {
    const errors = validateLogin({ email: "", password: "" });

    expect(errors.email).toBeDefined();
    expect(errors.password).toBeDefined();
  });

  it("rejects a malformed email", () => {
    const errors = validateLogin({
      email: "not-an-email",
      password: "secret123",
    });

    expect(errors.email).toMatch(/valid email/i);
  });

  it("requires at least six characters of password", () => {
    const errors = validateLogin({
      email: "person@example.com",
      password: "123",
    });

    expect(errors.password).toMatch(/6 characters/i);
  });
});

describe("validateContact", () => {
  const validMessage = {
    name: "Aline",
    email: "aline@example.com",
    subject: "Hello",
    message: "I would like to know more.",
  };

  it("returns no errors for a complete message", () => {
    expect(validateContact(validMessage)).toEqual({});
  });

  it("flags every empty field", () => {
    const errors = validateContact({
      name: "  ",
      email: "",
      subject: "",
      message: "",
    });

    expect(Object.keys(errors).sort()).toEqual([
      "email",
      "message",
      "name",
      "subject",
    ]);
  });

  it("flags an invalid email address", () => {
    const errors = validateContact({
      ...validMessage,
      email: "aline@",
    });

    expect(errors.email).toMatch(/valid email/i);
  });
});
