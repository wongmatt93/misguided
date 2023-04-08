import {
  RiAddBoxFill,
  RiDiscussFill,
  RiHome2Fill,
  RiLuggageCartFill,
  RiTeamFill,
} from "react-icons/ri";
import "./DummyDesktopNav.css";

interface Props {
  stage: string;
}

const DummyDesktopNav = ({ stage }: Props) => {
  return (
    <ul
      className="DummyDesktopNav"
      style={{ zIndex: stage && stage !== "final" ? "10000" : "100" }}
    >
      <li className={stage === "feed" ? "active" : ""}>
        <RiHome2Fill />
        <span>Feed</span>
      </li>
      <li className={stage === "explorers" ? "active" : ""}>
        <RiTeamFill />
        <span>Explorers</span>
      </li>
      <li className={stage === "planning" ? "active" : ""}>
        <RiAddBoxFill />
        <span>Plan</span>
      </li>
      <li className={stage === "trips" ? "active" : ""}>
        <RiLuggageCartFill />
        <span>Trips</span>
      </li>
      <li className={stage === "inbox" ? "active" : ""}>
        <RiDiscussFill />
        <span>Inbox</span>
      </li>
    </ul>
  );
};

export default DummyDesktopNav;
