import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../Components/Footer";

describe("<Footer/>", () => {
  test("Should be dark mode", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const modetheme = screen.getByTestId("footertest");

    expect(modetheme).toHaveClass("dark");
  });
});
