import { NavLink } from "react-router-dom";
import {
  RiDiscussFill,
  RiSpyFill,
  RiHome2Fill,
  RiAddBoxFill,
  RiLuggageCartFill,
} from "react-icons/ri";
import "./MobileNavigation.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const MobileNavigation = () => {
  const { userProfile } = useContext(AuthContext);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (userProfile) {
      setUnreadCount(
        userProfile.notifications.filter((notifs) => !notifs.read).length
      );
    }
  }, [userProfile]);

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
            <NavLink to="/user-profile">
              <RiSpyFill />
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default MobileNavigation;
