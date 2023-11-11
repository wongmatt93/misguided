import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signInWithGoogle } from "../../../firebaseConfig";
import LandingPage from "../LandingPage";

jest.mock("../../../firebaseConfig.ts");

describe("LandingPage component", () => {
  beforeEach(() => {
    render(<LandingPage />);
  });

  it('renders "misguided"', () => {
    expect(screen.getByText("misguided")).toBeInTheDocument();
  });

  it('renders "Dream"', () => {
    expect(screen.getByText("Dream")).toBeInTheDocument();
  });

  it('renders "We make the plan. You pack your bags."', () => {
    expect(
      screen.getByText("We make the plan. You pack your bags.")
    ).toBeInTheDocument();
  });

  it('renders a button with "Sign in with Google"', () => {
    expect(
      screen.getByRole("button", { name: "Sign in with Google" })
    ).toBeInTheDocument();
  });

  it("fires signInWithGoogle function when button is clicked", () => {
    const button = screen.getByRole("button", { name: "Sign in with Google" });

    userEvent.click(button);

    expect(signInWithGoogle).toHaveBeenCalled();
  });
});
