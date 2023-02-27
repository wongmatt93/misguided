import { useEffect, useState } from "react";
import Trip, { Message } from "../../../models/Trip";
import UserProfile from "../../../models/UserProfile";
import { getTripsByTripIdArray } from "../../../services/tripServices";
import "./TripMessagesSection.css";
import TripMessagesCard from "./TripMessagesCard";
import ListGroup from "react-bootstrap/ListGroup";

interface Props {
  userProfile: UserProfile;
}

const TripMessagesSection = ({ userProfile }: Props) => {
  const [unread, setUnread] = useState(0);
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const trips: string[] = [];
    setUnread(
      userProfile.notifications.filter(
        (notif) => notif.type === "tripMessage" && !notif.read
      ).length
    );

    userProfile.trips.forEach((trip) => {
      if (trip.accepted) {
        trips.push(trip.tripId);
      }
    });

    if (trips.length > 0) {
      getTripsByTripIdArray(trips).then((response) => {
        const initialArray: Trip[] = response.filter(
          (trip) => trip.participants.length > 1
        );
        const hasMessages: Trip[] = [];
        const noMessages: Trip[] = [];

        initialArray.forEach((trip) => {
          if (trip.messages.length > 0) {
            hasMessages.push(trip);
          } else {
            noMessages.push(trip);
          }
        });

        hasMessages.sort(function (a, b) {
          const aLatestMessage: Message | undefined =
            a.messages[a.messages.length - 1];
          const bLatestMessage: Message | undefined =
            b.messages[b.messages.length - 1];

          if (aLatestMessage!.date > bLatestMessage!.date) {
            return -1;
          } else {
            return 1;
          }
        });

        setTrips([...hasMessages, ...noMessages]);
      });
    }
  }, [userProfile]);

  return (
    <section className="TripMessagesSection">
      <h2>
        Messages{" "}
        <span style={{ display: unread ? "inline" : "none" }}>
          - {unread} unread
        </span>
      </h2>
      <ListGroup variant="flush">
        {trips.map((trip) => (
          <TripMessagesCard
            key={trip._id!}
            trip={trip}
            userProfile={userProfile}
          />
        ))}
      </ListGroup>
    </section>
  );
};

export default TripMessagesSection;
