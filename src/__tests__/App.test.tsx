import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders "misguided"', () => {
    expect(screen.getByText("misguided")).toBeInTheDocument();
  });
});
