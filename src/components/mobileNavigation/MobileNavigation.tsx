import { NavLink, useLocation } from "react-router-dom";
import {
  RiDiscussFill,
  RiTeamFill,
  RiHome2Fill,
  RiAddBoxFill,
  RiLuggageCartFill,
  RiRoadMapFill,
} from "react-icons/ri";
import "./MobileNavigation.css";
import { useContext, useEffect, useState } from "react";
import { Notification } from "../../models/UserProfile";
import AuthContext from "../../context/AuthContext";
import { isWelcome } from "../../utils/welcomeFunctions";

interface Props {
  notifications: Notification[];
}

const MobileNavigation = ({ notifications }: Props) => {
  const { currentTrip } = useContext(AuthContext);
  const [unreadCount, setUnreadCount] = useState(0);
  const path: string = useLocation().pathname;

  useEffect(() => {
    setUnreadCount(notifications.filter((notifs) => !notifs.read).length);
  }, [notifications]);

  return (
    <footer
      className="MobileNavigation"
      style={{ display: isWelcome(path) ? "none" : "block" }}
    >
      <nav>
        <ul>
          <li>
            <NavLink to="/feed">
              <RiHome2Fill />
            </NavLink>
          </li>
          <li>
            <NavLink to="/explorers">
              <RiTeamFill />
            </NavLink>
          </li>
          <li>
            {currentTrip && (
              <NavLink to={`/current/trip-details/${currentTrip._id!}`}>
                <RiRoadMapFill />
              </NavLink>
            )}
            {!currentTrip && (
              <NavLink to="/plan-trip">
                <RiAddBoxFill />
              </NavLink>
            )}
          </li>
          <li>
            <NavLink to="/trips">
              <RiLuggageCartFill />
            </NavLink>
          </li>
          <li>
            <NavLink to="/inbox">
              <div className="inbox-container">
                {unreadCount > 0 && (
                  <div className="notification-count">
                    <p className="number">{unreadCount}</p>
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

export default MobileNavigation;
