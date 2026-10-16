import { render, screen } from "@testing-library/react";
import PageLoader from "./PageLoader";

describe("PageLoader", () => {
  it("announces that a page is loading", () => {
    render(<PageLoader />);

    const status = screen.getByRole("status");
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("exposes a hidden loading label to assistive technology", () => {
    render(<PageLoader />);

    const label = screen.getByText("Loading page");
    expect(label).toHaveClass("visually-hidden");
  });

  it("hides the decorative spinner from assistive technology", () => {
    const { container } = render(<PageLoader />);

    expect(container.querySelector(".spinner")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});
