import { NavLink } from "react-router-dom";
import "./Footer.css";
import {
  RiDiscussFill,
  RiTeamFill,
  RiHome2Fill,
  RiAddBoxFill,
  RiLuggageCartFill,
} from "react-icons/ri";
import { Notification } from "../../../models/UserProfile";
import { getUnreadNotifsCount } from "../../../utils/userFunctions";

interface Props {
  notifications: Notification[];
}

const Footer = ({ notifications }: Props) => {
  // variables
  const unreadNotificationsCount: number = getUnreadNotifsCount(notifications);

  return (
    <footer className="Footer">
      <nav>
        <ul>
          <li>
            <NavLink aria-label="Navigate to Feed" to="/feed">
              <RiHome2Fill />
            </NavLink>
          </li>
          <li>
            <NavLink aria-label="Navigate to Explorers" to="/explorers">
              <RiTeamFill />
            </NavLink>
          </li>
          <li>
            <NavLink aria-label="Navigate to Planning" to="/planning">
              <RiAddBoxFill />
            </NavLink>
          </li>
          <li>
            <NavLink aria-label="Navigate to Trips" to="/trips">
              <RiLuggageCartFill />
            </NavLink>
          </li>
          <li>
            <NavLink aria-label="Navigate to Inbox" to="/inbox">
              <div className="inbox-container">
                {unreadNotificationsCount > 0 && (
                  <div className="notification-count">
                    <p className="number">{unreadNotificationsCount}</p>
                  </div>
                )}
                <RiDiscussFill />
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
