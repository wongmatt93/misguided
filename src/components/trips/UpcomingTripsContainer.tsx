import { UserTrip } from "../../models/UserProfile";
import TripCard from "./TripCard";
import "./UpcomingTripsContainer.css";

interface Props {
  upcomingTrips: UserTrip[];
}

const UpcomingTripsContainer = ({ upcomingTrips }: Props) => {
  return (
    <ul className="UpcomingTripsContainer">
      {upcomingTrips.map((trip) => (
        <TripCard key={trip.tripId} trip={trip} />
      ))}
    </ul>
  );
};

export default UpcomingTripsContainer;
