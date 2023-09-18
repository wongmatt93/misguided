import { Trip } from "../../../models/Trip";
import TripCard from "./TripCard";
import "./TripsContainer.css";

interface Props {
  trips: Trip[];
}

const TripsContainer = ({ trips }: Props) => {
  return (
    <ul className="TripsContainer">
      {trips.map((trip) => (
        <TripCard key={trip._id} trip={trip} />
      ))}
    </ul>
  );
};

export default TripsContainer;
