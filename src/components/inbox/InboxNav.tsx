import { NavLink } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import "./InboxNav.css";
import UserProfile from "../../models/UserProfile";
import { useEffect, useState } from "react";

interface Props {
  userProfile: UserProfile;
}

const InboxNav = ({ userProfile }: Props) => {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);

  useEffect(() => {
    setUnreadMessageCount(
      userProfile.notifications.filter(
        (notif) => notif.type === "tripMessage" && !notif.read
      ).length
    );
    setUnreadNotifCount(
      userProfile.notifications.filter(
        (notif) => notif.type !== "tripMessage" && !notif.read
      ).length
    );
  }, [userProfile]);

  return (
    <nav className="InboxNav">
      <ul>
        <li>
          <Badge>{unreadMessageCount}</Badge>
          <NavLink to="/inbox/messages">Messages</NavLink>
        </li>
        <li>
          <Badge>{unreadNotifCount}</Badge>
          <NavLink to="/inbox/notifications">Notifications</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default InboxNav;
