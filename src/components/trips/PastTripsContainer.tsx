import Trip from "../../models/Trip";
import PastTripCard from "./PastTripCard";
import "./PastTripsContainer.css";

interface Props {
  pastTrips: Trip[];
}

const PastTripsContainer = ({ pastTrips }: Props) => {
  return (
    <main className="PastTripsContainer">
      <ul>
        {pastTrips.map((trip) => (
          <PastTripCard key={trip._id!} trip={trip} />
        ))}
      </ul>
    </main>
  );
};

export default PastTripsContainer;
