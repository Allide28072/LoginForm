import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./home";

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
}

describe("Home page", () => {
  it("greets the visitor with the welcome heading", () => {
    renderHome();

    expect(
      screen.getByRole("heading", { name: /welcome ru\.ju\.gi\.ra/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("on ur site")).toBeInTheDocument();
  });

  it("links to the login and contact pages", () => {
    renderHome();

    expect(screen.getByRole("link", { name: /sign in/i })).toHaveAttribute(
      "href",
      "/login",
    );
    expect(screen.getByRole("link", { name: /get in touch/i })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("lists the feature cards with working links", () => {
    renderHome();

    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(3);

    expect(
      within(cards[1]).getByRole("link", { name: /try the login form/i }),
    ).toHaveAttribute("href", "/login");
    expect(
      within(cards[2]).getByRole("link", { name: /visit help center/i }),
    ).toHaveAttribute("href", "/help");
  });

  it("shows the closing call to action", () => {
    renderHome();

    expect(
      screen.getByRole("heading", { name: /ready to look around/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go to login/i }),
    ).toHaveAttribute("href", "/login");
  });
});
