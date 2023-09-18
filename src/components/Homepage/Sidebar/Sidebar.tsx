import {
  RiAddBoxFill,
  RiDiscussFill,
  RiHome2Fill,
  RiLuggageCartFill,
  RiTeamFill,
} from "react-icons/ri";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <nav className="Sidebar">
      <ul>
        <li>
          <NavLink to="/feed">
            <RiHome2Fill />
            <span>Feed</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/explorers">
            <RiTeamFill />
            <span>Explorers</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/planning">
            <RiAddBoxFill />
            <span>Plan</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/trips">
            <RiLuggageCartFill />
            <span>Trips</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/inbox">
            <div className="inbox-container">
              <RiDiscussFill />
              <span>Inbox</span>
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
