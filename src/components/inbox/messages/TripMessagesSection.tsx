import { useEffect, useState } from "react";
import Trip from "../../../models/Trip";
import UserProfile from "../../../models/UserProfile";
import { getTripsByTripIdArray } from "../../../services/tripServices";
import "./TripMessagesSection.css";
import TripMessagesCard from "./TripMessagesCard";

interface Props {
  userProfile: UserProfile;
}

const TripMessagesSection = ({ userProfile }: Props) => {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const trips: string[] = [];

    userProfile.trips.forEach((trip) => {
      if (trip.accepted) {
        trips.push(trip.tripId);
      }
    });

    getTripsByTripIdArray(trips).then((response) => {
      setTrips(response.filter((trip) => trip.participants.length > 1));
    });
  }, [userProfile]);

  return (
    <section className="TripMessagesSection">
      <h3>Messages</h3>
      <ul>
        {trips.map((trip) => (
          <TripMessagesCard key={trip._id!} trip={trip} />
        ))}
      </ul>
    </section>
  );
};

export default TripMessagesSection;
