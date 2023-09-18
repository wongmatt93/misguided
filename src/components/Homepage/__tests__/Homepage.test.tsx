import { render, screen } from "@testing-library/react";
import Homepage from "../Homepage";

describe("Homepage component", () => {
  beforeEach(() => {
    render(<Homepage />);
  });

  test('renders "misguided"', () => {
    expect(screen.getByText("misguided")).toBeInTheDocument();
  });
});
