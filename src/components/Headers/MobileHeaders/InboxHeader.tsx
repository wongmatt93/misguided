import { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { RiMoreFill } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import UserProfile, { Notification } from "../../../models/UserProfile";
import {
  deleteAllNotifications,
  readNotification,
} from "../../../services/userService";
import "./InboxHeader.css";

interface Props {
  path: string;
}

const InboxHeader = ({ path }: Props) => {
  const { userProfile, refreshProfile } = useContext(AuthContext);
  const [content, setContent] = useState("message");

  useEffect(() => {
    if (path.includes("message")) {
      setContent("message");
    } else {
      setContent("notification");
    }
  }, [path]);

  const markAllRead = async (): Promise<void> => {
    const unread: Notification[] = userProfile!.notifications.filter(
      (notif) => !notif.read && notif.type !== "tripMessage"
    );

    await Promise.allSettled(
      unread.map((notif) =>
        readNotification(userProfile!.uid, notif.uid, notif.date)
      )
    );

    refreshProfile();
  };

  const deleteAll = async (uid: string): Promise<void> => {
    await deleteAllNotifications(uid);
    refreshProfile();
  };

  return (
    <header className="InboxHeader">
      <h1>inbox</h1>
      {content === "notification" && (
        <Dropdown>
          <Dropdown.Toggle variant="warning">
            <RiMoreFill />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={markAllRead}>Mark All Read</Dropdown.Item>
            <Dropdown.Item onClick={() => deleteAll(userProfile!.uid)}>
              Delete All
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </header>
  );
};

export default InboxHeader;
