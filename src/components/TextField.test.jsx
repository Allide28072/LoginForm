import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextField from "./TextField";

describe("TextField", () => {
  it("links the label to the control", () => {
    render(<TextField id="name" label="Full name" />);

    const input = screen.getByLabelText("Full name");
    expect(input).toHaveAttribute("id", "name");
  });

  it("forwards extra props to the control", async () => {
    const user = userEvent.setup();

    function Controlled() {
      return (
        <TextField
          id="title"
          label="Title"
          placeholder="Type here"
          value=""
          onChange={() => {}}
        />
      );
    }

    render(<Controlled />);

    const input = screen.getByLabelText("Title");
    expect(input).toHaveAttribute("placeholder", "Type here");

    await user.type(input, "abc");
  });

  it("describes the control with its error message", () => {
    render(
      <TextField id="email" label="Email address" error="Enter a valid email." />,
    );

    const input = screen.getByLabelText("Email address");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-error");

    const error = screen.getByText("Enter a valid email.");
    expect(error).toHaveAttribute("id", "email-error");
  });

  it("leaves the aria attributes unset without an error", () => {
    render(<TextField id="email" label="Email address" />);

    const input = screen.getByLabelText("Email address");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).not.toHaveAttribute("aria-describedby");
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it("renders a textarea when asked", () => {
    render(
      <TextField id="message" label="Message" as="textarea" rows={5} />,
    );

    const textarea = screen.getByLabelText("Message");
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveAttribute("rows", "5");
  });

  it("renders a label action beside the label", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <TextField
        id="password"
        label="Password"
        labelAction={
          <button type="button" onClick={onClick}>
            Show
          </button>
        }
      />,
    );

    await user.click(screen.getByRole("button", { name: "Show" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("describes the control with its hint", () => {
    render(
      <TextField id="email" label="Email address" hint="We never share it." />,
    );

    const input = screen.getByLabelText("Email address");
    expect(input).toHaveAttribute("aria-describedby", "email-hint");

    const hint = screen.getByText("We never share it.");
    expect(hint).toHaveAttribute("id", "email-hint");
    expect(hint).toHaveClass("field-hint");
  });

  it("describes the control with both hint and error", () => {
    render(
      <TextField
        id="email"
        label="Email address"
        hint="We never share it."
        error="Enter a valid email."
      />,
    );

    const input = screen.getByLabelText("Email address");
    expect(input).toHaveAttribute("aria-describedby", "email-error");
    expect(screen.queryByText("We never share it.")).not.toBeInTheDocument();
    expect(screen.getByText("Enter a valid email.")).toBeInTheDocument();
  });
});
