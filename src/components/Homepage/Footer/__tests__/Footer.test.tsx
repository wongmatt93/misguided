import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer component", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test('renders "misguided"', () => {
    expect(screen.getByText("misguided")).toBeInTheDocument();
  });
});
