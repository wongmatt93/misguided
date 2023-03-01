import { RiFlightLandFill } from "react-icons/ri";
import Trip from "../../models/Trip";
import PastTripCard from "./PastTripCard";
import "./PastTripsContainer.css";

interface Props {
  pastTrips: Trip[];
}

const PastTripsContainer = ({ pastTrips }: Props) => {
  return (
    <main className="PastTripsContainer">
      {pastTrips.length > 0 ? (
        <ul>
          {pastTrips.map((trip) => (
            <PastTripCard key={trip._id!} trip={trip} />
          ))}
        </ul>
      ) : (
        <div className="empty">
          <RiFlightLandFill />
          <p>Your completed trips will to populate here</p>
        </div>
      )}
    </main>
  );
};

export default PastTripsContainer;
