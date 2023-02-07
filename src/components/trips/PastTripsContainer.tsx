import Trip from "../../models/Trip";
import "./PastTripsContainer.css";
import TripCard from "./TripCard";

interface Props {
  pastTrips: Trip[];
}

const PastTripsContainer = ({ pastTrips }: Props) => {
  return (
    <ul className="PastTripsContainer">
      {pastTrips.map((trip) => (
        <TripCard key={trip._id!} trip={trip} />
      ))}
    </ul>
  );
};

export default PastTripsContainer;
