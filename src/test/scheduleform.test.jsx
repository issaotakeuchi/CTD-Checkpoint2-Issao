import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import ScheduleForm from '../Components/ScheduleForm'
import AuthProvider from '../providers/AuthContext'

describe("<ScheduleForm/>", () => {
  test("Should be dark mode", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ScheduleForm />
        </AuthProvider>
      </BrowserRouter>
    )

    const modetheme = screen.getByTestId("scheduleformtest")

    expect(modetheme).toHaveClass("dark text-center container")
  })
})
