import { Trip } from "../../../models/Trip";
import TripCard from "./TripCard";
import "./TripsContainer.css";

interface Props {
  refreshProfile: () => Promise<void>;
  trips: Trip[];
  pastTrip: boolean;
}

const TripsContainer = ({ refreshProfile, trips, pastTrip }: Props) => {
  return (
    <ul className="TripsContainer">
      {trips.map((trip) => (
        <TripCard
          key={trip._id}
          refreshProfile={refreshProfile}
          trip={trip}
          pastTrip={pastTrip}
        />
      ))}
    </ul>
  );
};

export default TripsContainer;
