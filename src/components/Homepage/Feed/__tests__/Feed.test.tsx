import { render, screen } from "@testing-library/react";
import Feed from "../FeedMain";

describe("Feed component", () => {
  beforeEach(() => {
    render(<Feed />);
  });

  test("renders feed tab", () => {
    expect(screen.getByText("Feed")).toBeInTheDocument();
  });
});
