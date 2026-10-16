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

  it("rejects an email address above 254 characters", () => {
    const errors = validateLogin({
      email: `${"a".repeat(250)}@example.com`,
      password: "secret123",
    });

    expect(errors.email).toMatch(/at most 254 characters/i);
  });

  it("requires at least six characters of password", () => {
    const errors = validateLogin({
      email: "person@example.com",
      password: "123",
    });

    expect(errors.password).toMatch(/6 characters/i);
  });

  it("rejects a password above the maximum length", () => {
    const errors = validateLogin({
      email: "person@example.com",
      password: "a".repeat(129),
    });

    expect(errors.password).toMatch(/at most 128 characters/i);
  });

  it("accepts a password at the maximum length", () => {
    expect(
      validateLogin({
        email: "person@example.com",
        password: "a".repeat(128),
      }),
    ).toEqual({});
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

  it("rejects a name above 80 characters", () => {
    const errors = validateContact({
      ...validMessage,
      name: "a".repeat(81),
    });

    expect(errors.name).toMatch(/at most 80 characters/i);
  });

  it("accepts a name of exactly 80 characters", () => {
    expect(
      validateContact({ ...validMessage, name: "a".repeat(80) }),
    ).toEqual({});
  });

  it("flags an email address above 254 characters", () => {
    const errors = validateContact({
      ...validMessage,
      email: `${"a".repeat(250)}@example.com`,
    });

    expect(errors.email).toMatch(/at most 254 characters/i);
  });

  it("requires at least ten characters of message", () => {
    const errors = validateContact({
      ...validMessage,
      message: "Hi",
    });

    expect(errors.message).toMatch(/at least 10 characters/i);
  });

  it("accepts a message of exactly ten characters", () => {
    expect(
      validateContact({ ...validMessage, message: "0123456789" }),
    ).toEqual({});
  });

  it("rejects a message above 1000 characters", () => {
    const errors = validateContact({
      ...validMessage,
      message: "a".repeat(1001),
    });

    expect(errors.message).toMatch(/at most 1000 characters/i);
  });
});
