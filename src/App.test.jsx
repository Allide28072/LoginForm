import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

function renderApp(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App routing", () => {
  it("renders the home page at the root path", async () => {
    renderApp("/");

    expect(
      await screen.findByRole("heading", { name: /a friendly home for/i }),
    ).toBeInTheDocument();
  });

  it("renders the about page", async () => {
    renderApp("/about");

    expect(
      await screen.findByRole("heading", { name: /good design/i }),
    ).toBeInTheDocument();
  });

  it("renders the contact page", async () => {
    renderApp("/contact");

    expect(
      await screen.findByRole("heading", { name: /send a message/i }),
    ).toBeInTheDocument();
  });

  it("renders the unknown page for unmatched routes", async () => {
    renderApp("/there-is-no-such-page");

    expect(
      await screen.findByRole("heading", { name: /page not found/i }),
    ).toBeInTheDocument();
  });

  it("redirects the /signin alias to the login page", async () => {
    renderApp("/signin");

    expect(
      await screen.findByRole("heading", { name: /sign in to your account/i }),
    ).toBeInTheDocument();
  });

  it("renders the primary navigation and the footer", async () => {
    renderApp("/");

    await screen.findByRole("heading", { name: /a friendly home for/i });

    expect(
      screen.getByRole("navigation", { name: /primary/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("contentinfo"),
    ).toBeInTheDocument();
  });
});
