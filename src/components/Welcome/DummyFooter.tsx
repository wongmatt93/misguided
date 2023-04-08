import {
  RiAddBoxFill,
  RiDiscussFill,
  RiHome2Fill,
  RiLuggageCartFill,
  RiTeamFill,
} from "react-icons/ri";
import "./DummyFooter.css";

interface Props {
  stage: string;
}

const DummyFooter = ({ stage }: Props) => {
  return (
    <ul
      className="DummyFooter"
      style={{ zIndex: stage && stage !== "final" ? "10000" : "100" }}
    >
      <li className={stage === "feed" ? "active" : ""}>
        <RiHome2Fill />
      </li>
      <li className={stage === "explorers" ? "active" : ""}>
        <RiTeamFill />
      </li>
      <li className={stage === "planning" ? "active" : ""}>
        <RiAddBoxFill />
      </li>
      <li className={stage === "trips" ? "active" : ""}>
        <RiLuggageCartFill />
      </li>
      <li className={stage === "inbox" ? "active" : ""}>
        <RiDiscussFill />
      </li>
    </ul>
  );
};

export default DummyFooter;
