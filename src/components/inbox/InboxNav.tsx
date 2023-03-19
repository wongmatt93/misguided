import { NavLink, useLocation } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import "./InboxNav.css";
import { Notification } from "../../models/UserProfile";
import { useEffect, useState } from "react";

interface Props {
  notifications: Notification[];
}

const InboxNav = ({ notifications }: Props) => {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);
  const [detailsShowing, setDetailsShowing] = useState(false);
  const location: string = useLocation().pathname;

  useEffect(() => {
    location.includes("thread") || location.includes("trip-details")
      ? setDetailsShowing(true)
      : setDetailsShowing(false);
  }, [location]);

  useEffect(() => {
    const unreadMessages: Notification[] = [];
    const unreadNotifs: Notification[] = [];

    notifications.forEach((notif) => {
      if (notif.type === "tripMessage" && !notif.read) {
        unreadMessages.push(notif);
      } else if (!notif.read) {
        unreadNotifs.push(notif);
      }
    });

    setUnreadMessageCount(unreadMessages.length);
    setUnreadNotifCount(unreadNotifs.length);
  }, [notifications]);

  return (
    <nav
      className="InboxNav"
      style={{ display: detailsShowing ? "none" : "block" }}
    >
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
