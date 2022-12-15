import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../Components/LoginForm";

describe("<LoginForm/>", () => {
  test("Should be dark mode", () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    const modetheme = screen.getByTestId("loginformtest");

    expect(modetheme).toHaveClass("text-center card container card cardDark");
  });
});
