import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );
}

describe("Footer", () => {
  it("renders a branded home link", () => {
    renderFooter();

    expect(screen.getByRole("link", { name: /loginform/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders the explore links", () => {
    renderFooter();

    for (const label of ["Home", "About", "Help"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("renders reachable contact details", () => {
    renderFooter();

    expect(screen.getByRole("link", { name: /@/ })).toHaveAttribute(
      "href",
      "mailto:Karangwa@gmail.com",
    );
    expect(screen.getByRole("link", { name: /\+250/ })).toHaveAttribute(
      "href",
      "tel:+250798917894",
    );
  });

  it("renders the copyright line", () => {
    renderFooter();

    expect(screen.getByText(/© \d{4} LoginForm/)).toBeInTheDocument();
  });

  it("renders the current year in the copyright line", () => {
    renderFooter();

    const year = String(new Date().getFullYear());
    expect(
      screen.getByText(new RegExp(`©\\s*${year} LoginForm`)),
    ).toBeInTheDocument();
  });

  it("links to the contact page", () => {
    renderFooter();

    expect(
      screen.getByRole("link", { name: /send a message/i }),
    ).toHaveAttribute("href", "/contact");
  });
});
