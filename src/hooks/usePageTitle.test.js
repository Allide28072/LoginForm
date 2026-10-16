import { renderHook } from "@testing-library/react";
import usePageTitle from "./usePageTitle";

describe("usePageTitle", () => {
  it("sets the document title with the site suffix", () => {
    renderHook(() => usePageTitle("Sign in"));

    expect(document.title).toBe("Sign in | LoginForm");
  });

  it("falls back to the default title without a value", () => {
    renderHook(() => usePageTitle());

    expect(document.title).toBe("LoginForm | React demo website");
  });

  it("updates the document title when the value changes", () => {
    const { rerender } = renderHook(({ title }) => usePageTitle(title), {
      initialProps: { title: "Home" },
    });

    expect(document.title).toBe("Home | LoginForm");

    rerender({ title: "About" });

    expect(document.title).toBe("About | LoginForm");
  });
});
