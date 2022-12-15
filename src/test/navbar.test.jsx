import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../Components/Navbar";

describe("<Navbar/>", () => {
  test("Should change theme after click the button", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const button = screen.getByTestId("btn-dark-mode");
    fireEvent.click(button);

    const modetheme = screen.getByTestId("navbartest");
    expect(modetheme).toHaveClass("navbar navbar-expand-sm navbar-black bg-black");
  });
});
