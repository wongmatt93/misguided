import { Trip } from "../../../models/Trip";
import { Notification } from "../../../models/UserProfile";
import { deleteNotification } from "../../../services/userProfileServices";
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
  const hasMessages: Trip[] = [];
  const noMessages: Trip[] = [];

  const excessNotifs: Notification[] = notifications.filter(
    (notification) =>
      !tripsWithParties.some((trip) => trip._id === notification.tripId)
  );

  // functions
  // splitting trips that have messages vs. no messages
  tripsWithParties.forEach((trip) =>
    trip.messages.length ? hasMessages.push(trip) : noMessages.push(trip)
  );

  // sort tripsWithMessages
  hasMessages.sort((a: Trip, b: Trip) => {
    const lastMessageA = a.messages[a.messages.length - 1];
    const lastMessageB = b.messages[b.messages.length - 1];

    return lastMessageA!.date > lastMessageB!.date ? -1 : 1;
  });

  // joining the sorted messages with no messages
  const sortedTrips: Trip[] = hasMessages.concat(noMessages);

  // gets rid of any notifications for trips that no longer have parties
  excessNotifs.forEach((excessNotif) =>
    deleteNotification(uid, excessNotif.user.uid, excessNotif.date)
  );

  return (
    <ul className="MessagesContainer">
      {sortedTrips.map((trip) => (
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
