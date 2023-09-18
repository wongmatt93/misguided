import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Trip } from "../../../models/Trip";
import { Notification, UserProfile } from "../../../models/UserProfile";
import { sortNotifications } from "../../../utils/dateFunctions";
import "./InboxMain.css";
import MessagesContainer from "./MessagesContainer";
import NotificationsContainer from "./NotificationsContainer";

interface Props {
  userProfile: UserProfile;
  refreshProfile: () => Promise<void>;
}

const InboxMain = ({ userProfile, refreshProfile }: Props) => {
  // variables
  const { uid, upcomingTrips, pastTrips } = userProfile;
  const trips: Trip[] = upcomingTrips.concat(pastTrips);
  const notifs: Notification[] = [];
  const messages: Notification[] = [];

  // functions
  userProfile.notifications.forEach((notification) => {
    notification.type === "tripMessage"
      ? messages.push(notification)
      : notifs.push(notification);
  });

  return (
    <div className="InboxMain">
      <Tabs justify variant="pills">
        <Tab eventKey="notifications" title="Notifications">
          <NotificationsContainer
            uid={uid}
            notifications={sortNotifications(notifs)}
            refreshProfile={refreshProfile}
          />
        </Tab>
        <Tab eventKey="messages" title="Messages">
          <MessagesContainer
            uid={uid}
            trips={trips}
            notifications={messages}
            refreshProfile={refreshProfile}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default InboxMain;
