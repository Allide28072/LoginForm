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

  it("rejects an invalid email address", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText(/email address/i), "not-an-email");
    await user.type(screen.getByLabelText(/^password$/i), "secret123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
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
});
