import { NavLink } from "react-router-dom";
import {
  RiDiscussFill,
  RiSpyFill,
  RiHome2Fill,
  RiAddBoxFill,
  RiLuggageCartFill,
} from "react-icons/ri";
import "./MobileNavigation.css";
import { useEffect, useState } from "react";
import { Notification } from "../../models/UserProfile";

interface Props {
  notifications: Notification[];
}

const MobileNavigation = ({ notifications }: Props) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUnreadCount(notifications.filter((notifs) => !notifs.read).length);
  }, [notifications]);

  return (
    <footer className="MobileNavigation">
      <nav>
        <ul>
          <li>
            <NavLink to="/home">
              <RiHome2Fill />
            </NavLink>
          </li>
          <li>
            <NavLink to="/trips">
              <RiLuggageCartFill />
            </NavLink>
          </li>
          <li>
            <NavLink to="/plan-trip">
              <RiAddBoxFill />
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
          <li>
            <NavLink to="/settings">
              <RiSpyFill />
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default MobileNavigation;
