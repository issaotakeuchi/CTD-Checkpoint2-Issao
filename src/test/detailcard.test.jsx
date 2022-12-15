import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import DetailCard from "../Components/DetailCard"
import AuthProvider from '../providers/AuthContext'

describe("<DetailCard/>", () => {
  test("Should be dark mode", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <DetailCard />
        </AuthProvider>
      </BrowserRouter>
    )

    const modetheme = screen.getByTestId("detailcardtest")

    expect(modetheme).toHaveClass("dark card-body row")
  })
})
