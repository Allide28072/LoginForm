import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Contact from "./contact";

function renderContact() {
  return render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>,
  );
}

describe("Contact page", () => {
  it("renders the message form", () => {
    renderContact();

    expect(
      screen.getByRole("heading", { name: /send a message/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("marks every field as required", () => {
    renderContact();

    for (const label of [/full name/i, /email address/i, /subject/i, /message/i]) {
      expect(screen.getByLabelText(label)).toHaveAttribute(
        "aria-required",
        "true",
      );
    }
  });

  it("updates the message character counter while typing", async () => {
    const user = userEvent.setup();
    renderContact();

    const counter = document.getElementById("contact-message-counter");
    expect(counter).toHaveTextContent("0/1000");

    await user.type(screen.getByLabelText(/message/i), "Hello");

    expect(counter).toHaveTextContent("5/1000");
  });

  it("limits the message field to the maximum length", () => {
    renderContact();

    expect(screen.getByLabelText(/message/i)).toHaveAttribute(
      "maxlength",
      "1000",
    );
  });

  it("trims a field value when it loses focus", async () => {
    const user = userEvent.setup();
    renderContact();

    const name = screen.getByLabelText(/full name/i);
    await user.type(name, "  Aline  ");
    await user.tab();

    expect(name).toHaveValue("Aline");
  });

  it("reports every empty field", async () => {
    const user = userEvent.setup();
    renderContact();

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText(/enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/enter your email address/i)).toBeInTheDocument();
    expect(screen.getByText(/add a subject/i)).toBeInTheDocument();
    expect(screen.getByText(/write your message/i)).toBeInTheDocument();
  });

  it("rejects an invalid email address", async () => {
    const user = userEvent.setup();
    renderContact();

    await user.type(screen.getByLabelText(/full name/i), "Aline");
    await user.type(screen.getByLabelText(/email address/i), "aline@");
    await user.type(screen.getByLabelText(/subject/i), "Hello");
    await user.type(screen.getByLabelText(/message/i), "A question");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
  });

  it("confirms a valid message and resets the form", async () => {
    const user = userEvent.setup();
    renderContact();

    await user.type(screen.getByLabelText(/full name/i), "Aline");
    await user.type(screen.getByLabelText(/email address/i), "aline@example.com");
    await user.type(screen.getByLabelText(/subject/i), "Hello");
    await user.type(screen.getByLabelText(/message/i), "A question");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(
      await screen.findByText(/passed validation/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveValue("");
  });
});
