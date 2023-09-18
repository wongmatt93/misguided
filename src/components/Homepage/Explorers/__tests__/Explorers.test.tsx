import { render, screen } from "@testing-library/react";
import Explorers from "../ExplorersMain";

describe("Explorers component", () => {
  beforeEach(() => {
    render(<Explorers />);
  });

  test("renders Explorers tab", () => {
    expect(screen.getByText("Explorers works")).toBeInTheDocument();
  });
});
