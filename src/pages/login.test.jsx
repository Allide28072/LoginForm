import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "./login";

function renderLogin() {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );
}

describe("Login page", () => {
  it("renders the sign in form", () => {
    renderLogin();

    expect(
      screen.getByRole("heading", { name: /sign in to your account/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute(
      "maxlength",
      "254",
    );
    expect(screen.getByLabelText(/^password$/i)).toHaveAttribute(
      "maxlength",
      "128",
    );
  });

  it("reports missing email and password", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(
      screen.getByText(/please enter your email address/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/please enter your password/i),
    ).toBeInTheDocument();
  });

  it("marks the form aria-busy while submitting", async () => {
    const user = userEvent.setup();
    renderLogin();

    const form = screen.getByRole("form", { name: /sign in form/i });
    expect(form).toHaveAttribute("aria-busy", "false");

    await user.type(screen.getByLabelText(/email address/i), "me@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "secret123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(form).toHaveAttribute("aria-busy", "true");

    expect(
      await screen.findByText(/form validated successfully/i),
    ).toBeInTheDocument();
    expect(form).toHaveAttribute("aria-busy", "false");
  });

  it("disables the inputs while signing in", async () => {
    const user = userEvent.setup();
    renderLogin();

    const email = screen.getByLabelText(/email address/i);
    const remember = screen.getByRole("checkbox", { name: /remember me/i });

    await user.type(email, "me@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "secret123");
    await user.click(screen.getByRole("button", { name: /^sign in/i }));

    expect(email).toBeDisabled();
    expect(remember).toBeDisabled();

    expect(
      await screen.findByText(/form validated successfully/i),
    ).toBeInTheDocument();
    expect(email).toBeEnabled();
    expect(remember).toBeEnabled();
  });

  it("rejects an invalid email address", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText(/email address/i), "not-an-email");
    await user.type(screen.getByLabelText(/^password$/i), "secret123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
  });

  it("focuses the first invalid field after a failed submit", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.getByLabelText(/email address/i)).toHaveFocus();
  });

  it("accepts an email address wrapped in whitespace", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(
      screen.getByLabelText(/email address/i),
      "  me@example.com  ",
    );
    await user.type(screen.getByLabelText(/^password$/i), "secret123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(
      await screen.findByText(/form validated successfully/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toHaveValue(
      "me@example.com",
    );
  });

  it("requires a password of at least six characters", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText(/email address/i), "me@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.getByText(/at least 6 characters/i)).toBeInTheDocument();
  });

  it("clears a field error once the user edits the field", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.click(screen.getByRole("button", { name: /sign in/i }));
    expect(
      screen.getByText(/please enter your email address/i),
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText(/email address/i), "a");

    expect(
      screen.queryByText(/please enter your email address/i),
    ).not.toBeInTheDocument();
  });

  it("shows a success message after a valid submission", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText(/email address/i), "me@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "secret123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(
      await screen.findByText(/form validated successfully/i),
    ).toBeInTheDocument();
  });

  it("toggles password visibility", async () => {
    const user = userEvent.setup();
    renderLogin();

    const password = screen.getByLabelText(/^password$/i);
    expect(password).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: /show/i }));

    expect(password).toHaveAttribute("type", "text");
  });

  it("shows a notice when password recovery is requested", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.click(screen.getByRole("button", { name: /forgot password/i }));

    expect(
      screen.getByText(/password recovery is not connected yet/i),
    ).toHaveClass("notice");
    expect(
      screen.getByRole("status"),
    ).toHaveTextContent(/password recovery is not connected yet/i);
  });
});
