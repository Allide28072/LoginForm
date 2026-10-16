import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./notFound";

function renderNotFound() {
  return render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
}

describe("NotFound page", () => {
  it("explains that the page is missing", () => {
    renderNotFound();

    expect(
      screen.getByRole("heading", { name: /page not found/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/does not exist or may have been moved/i),
    ).toBeInTheDocument();
  });

  it("offers a link back to the homepage", () => {
    renderNotFound();

    expect(
      screen.getByRole("link", { name: /back to home/i }),
    ).toHaveAttribute("href", "/");
  });
});
