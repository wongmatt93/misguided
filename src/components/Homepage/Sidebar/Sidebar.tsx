import {
  RiAddBoxFill,
  RiDiscussFill,
  RiHome2Fill,
  RiLuggageCartFill,
  RiTeamFill,
} from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { Notification } from "../../../models/UserProfile";
import { getUnreadNotifsCount } from "../../../utils/userFunctions";
import "./Sidebar.css";

interface Props {
  notifications: Notification[];
}

const Sidebar = ({ notifications }: Props) => {
  // variables
  const unreadNotificationsCount: number = getUnreadNotifsCount(notifications);

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
              {unreadNotificationsCount > 0 && (
                <div className="notification-count">
                  <p className="number">{unreadNotificationsCount}</p>
                </div>
              )}
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
