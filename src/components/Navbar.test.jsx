import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function JumpButton() {
  const navigate = useNavigate();

  return (
    <button type="button" onClick={() => navigate("/help")}>
      Jump to help
    </button>
  );
}

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

  it("closes the mobile menu after navigating elsewhere", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
        <JumpButton />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("navigation")).toHaveClass("open");

    await user.click(screen.getByRole("button", { name: /jump to help/i }));

    expect(screen.getByRole("navigation")).not.toHaveClass("open");
  });

  it("locks body scrolling while the menu is open", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(screen.getByRole("button", { name: /close menu/i }));
    expect(document.body.style.overflow).toBe("");
  });
});
