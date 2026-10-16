import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

function renderNavbar() {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );
}

describe("Navbar", () => {
  it("renders every primary link", () => {
    renderNavbar();

    for (const label of ["Home", "About", "Contact", "Help"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }

    expect(
      screen.getByRole("link", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("marks the current route as active", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "About" })).toHaveClass(
      "nav-link",
      "active",
    );
  });

  it("toggles the mobile menu with the menu button", async () => {
    const user = userEvent.setup();
    renderNavbar();

    const toggle = screen.getByRole("button", { name: /open menu/i });
    const navigation = screen.getByRole("navigation");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(navigation).not.toHaveClass("open");

    await user.click(toggle);

    expect(
      screen.getByRole("button", { name: /close menu/i }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(navigation).toHaveClass("open");

    await user.click(screen.getByRole("button", { name: /close menu/i }));

    expect(navigation).not.toHaveClass("open");
  });
});
