import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Help from "./help";

function renderHelp() {
  return render(
    <MemoryRouter>
      <Help />
    </MemoryRouter>,
  );
}

describe("Help page", () => {
  it("lists the questions with the first one open", () => {
    renderHelp();

    const first = screen.getByRole("button", {
      name: /what is loginform/i,
    });

    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("region", { name: /what is loginform/i }),
    ).toBeInTheDocument();
  });

  it("opens a question when it is clicked", async () => {
    const user = userEvent.setup();
    renderHelp();

    const second = screen.getByRole("button", {
      name: /how do i navigate/i,
    });

    expect(second).toHaveAttribute("aria-expanded", "false");

    await user.click(second);

    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("region", { name: /how do i navigate/i }),
    ).toBeInTheDocument();
  });

  it("closes an open question when clicked again", async () => {
    const user = userEvent.setup();
    renderHelp();

    const first = screen.getByRole("button", { name: /what is loginform/i });

    await user.click(first);

    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("filters the questions by search text", async () => {
    const user = userEvent.setup();
    renderHelp();

    await user.type(
      screen.getByLabelText(/search the help center/i),
      "authenticate",
    );

    expect(
      screen.getByRole("button", { name: /authenticate users/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /what is loginform/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("1 of 5 articles")).toBeInTheDocument();
  });
});
