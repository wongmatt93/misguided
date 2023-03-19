import { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { RiMenuLine } from "react-icons/ri";
import AuthContext from "../../../context/AuthContext";
import { Notification } from "../../../models/UserProfile";
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
    <div className="InboxHeader MobileHeaderDiv">
      <h1>inbox</h1>
      {content === "notification" && (
        <Dropdown>
          <Dropdown.Toggle variant="warning">
            <RiMenuLine />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={markAllRead}>Mark All Read</Dropdown.Item>
            <Dropdown.Item onClick={() => deleteAll(userProfile!.uid)}>
              Delete All
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default InboxHeader;
