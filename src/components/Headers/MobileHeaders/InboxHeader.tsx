import { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { RiMenuLine } from "react-icons/ri";
import AuthContext from "../../../context/AuthContext";
import { UserProfile, Notification } from "../../../models/UserProfile";
import {
  updateUserProfile,
  readNotification,
} from "../../../services/userService";
import { formatUserProfileToSave } from "../../../utils/userFunctions";
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

  const deleteAll = async (): Promise<void> => {
    if (userProfile) {
      const formattedProfile: UserProfile =
        formatUserProfileToSave(userProfile);
      await updateUserProfile({ ...formattedProfile, notifications: [] });
      refreshProfile();
    }
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
            <Dropdown.Item onClick={deleteAll}>Delete All</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default InboxHeader;
