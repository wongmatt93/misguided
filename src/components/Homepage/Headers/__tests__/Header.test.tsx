import { render, screen } from "@testing-library/react";
import Header from "../DesktopHeader";

describe("Header component", () => {
  beforeEach(() => {
    render(<Header />);
  });

  test('renders "misguided"', () => {
    expect(screen.getByText("misguided")).toBeInTheDocument();
  });
});
