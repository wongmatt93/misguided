import Trip from "../../models/Trip";
import TripCard from "./TripCard";
import "./TripRequestsContainer.css";

interface Props {
  tripRequests: Trip[];
}

const TripRequestsContainer = ({ tripRequests }: Props) => {
  return (
    <ul className="TripRequestsContainer">
      {tripRequests.map((trip) => (
        <TripCard key={trip._id!} trip={trip} />
      ))}
    </ul>
  );
};

export default TripRequestsContainer;
