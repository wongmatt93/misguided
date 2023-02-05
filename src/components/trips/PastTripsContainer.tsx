import { UserTrip } from "../../models/UserProfile";
import "./PastTripsContainer.css";
import TripCard from "./TripCard";

interface Props {
  pastTrips: UserTrip[];
}

const PastTripsContainer = ({ pastTrips }: Props) => {
  return (
    <ul className="PastTripsContainer">
      <ul className="UpcomingTripsContainer">
        {pastTrips.map((trip) => (
          <TripCard key={trip.tripId} trip={trip} />
        ))}
      </ul>
    </ul>
  );
};

export default PastTripsContainer;
