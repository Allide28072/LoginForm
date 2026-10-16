import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import About from "./about";

function renderAbout() {
  return render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
}

describe("About page", () => {
  it("introduces the project", () => {
    renderAbout();

    expect(
      screen.getByRole("heading", { name: /good design/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /about this project/i }),
    ).toBeInTheDocument();
  });

  it("lists the approach and the technologies", () => {
    renderAbout();

    const approach = screen.getByRole("heading", {
      name: /built around the basics/i,
    });
    expect(approach).toBeInTheDocument();

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(4);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Responsive Design")).toBeInTheDocument();
  });

  it("links to the contact page", () => {
    renderAbout();

    expect(screen.getByRole("link", { name: /contact us/i })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});
