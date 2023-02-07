import Trip from "../../models/Trip";
import TripCard from "./TripCard";
import "./UpcomingTripsContainer.css";

interface Props {
  upcomingTrips: Trip[];
}

const UpcomingTripsContainer = ({ upcomingTrips }: Props) => {
  return (
    <ul className="UpcomingTripsContainer">
      {upcomingTrips.map((trip) => (
        <TripCard key={trip._id!} trip={trip} />
      ))}
    </ul>
  );
};

export default UpcomingTripsContainer;
