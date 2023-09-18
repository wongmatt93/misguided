import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Siderbar from "../Sidebar";

describe("Siderbar component", () => {
  beforeEach(() => {
    render(
      <Router>
        <Siderbar />
      </Router>
    );
  });

  describe("Feed tab", () => {
    test("Feed link has href of /feed", async () => {
      expect(screen.getByRole("link", { name: "Feed" })).toHaveAttribute(
        "href",
        "/feed"
      );
    });
  });

  describe("Explorers tab", () => {
    test("Explorers link has href of /explorers", async () => {
      expect(screen.getByRole("link", { name: "Explorers" })).toHaveAttribute(
        "href",
        "/explorers"
      );
    });
  });

  describe("Planning tab", () => {
    test("Planning link has href of /planning", async () => {
      expect(screen.getByRole("link", { name: "Planning" })).toHaveAttribute(
        "href",
        "/planning"
      );
    });
  });

  describe("Trips tab", () => {
    test("Trips link has href of /trips", async () => {
      expect(screen.getByRole("link", { name: "Trips" })).toHaveAttribute(
        "href",
        "/trips"
      );
    });
  });

  describe("Inbox tab", () => {
    test("Inbox link has href of /inbox", async () => {
      expect(screen.getByRole("link", { name: "Inbox" })).toHaveAttribute(
        "href",
        "/inbox"
      );
    });
  });
});
