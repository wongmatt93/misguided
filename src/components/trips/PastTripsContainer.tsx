import Trip from "../../models/Trip";
import "./PastTripsContainer.css";
import TripCard from "./TripCard";

interface Props {
  pastTrips: Trip[];
}

const PastTripsContainer = ({ pastTrips }: Props) => {
  return (
    <ul className="PastTripsContainer">
      <ul className="UpcomingTripsContainer">
        {pastTrips.map((trip) => (
          <TripCard key={trip._id!} trip={trip} />
        ))}
      </ul>
    </ul>
  );
};

export default PastTripsContainer;
