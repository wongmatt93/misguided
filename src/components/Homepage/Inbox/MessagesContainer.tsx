import { Trip } from "../../../models/Trip";
import { Notification } from "../../../models/UserProfile";
import MessageCard from "./MessageCard";
import "./MessagesContainer.css";

interface Props {
  uid: string;
  trips: Trip[];
  notifications: Notification[];
  refreshProfile: () => Promise<void>;
}

const MessagesContainer = ({
  uid,
  trips,
  notifications,
  refreshProfile,
}: Props) => {
  // variables
  const tripsWithParties: Trip[] = trips.filter(
    (trip) =>
      trip.participants.filter((participant) => participant.accepted).length > 1
  );

  return (
    <ul className="MessagesContainer">
      {tripsWithParties.map((trip) => (
        <MessageCard
          key={trip._id!}
          uid={uid}
          trip={trip!}
          notifications={notifications}
          refreshProfile={refreshProfile}
        />
      ))}
    </ul>
  );
};

export default MessagesContainer;
