import { useEffect, useState } from "react";
import {
  RiAddBoxFill,
  RiDiscussFill,
  RiHome2Fill,
  RiLuggageCartFill,
  RiTeamFill,
} from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import { Notification } from "../../models/UserProfile";
import { isWelcome } from "../../utils/welcomeFunctions";
import "./DesktopNavigation.css";

interface Props {
  notifications: Notification[];
}

const DesktopNavigation = ({ notifications }: Props) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const path: string = useLocation().pathname;

  useEffect(() => {
    setUnreadCount(notifications.filter((notifs) => !notifs.read).length);
  }, [notifications]);

  return (
    <nav
      className="DesktopNavigation"
      style={{ display: isWelcome(path) ? "none" : "block" }}
    >
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
          <NavLink to="/plan-trip">
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
              {unreadCount > 0 && (
                <div className="notification-count">
                  <p className="number">{unreadCount}</p>
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

export default DesktopNavigation;
