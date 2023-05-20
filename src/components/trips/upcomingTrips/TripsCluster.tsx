import { Trip } from "../../../models/Trip";
import TripCard from "./TripCard";
import "./TripsCluster.css";

interface Props {
  trips: Trip[];
}

const TripCluster = ({ trips }: Props) => {
  return (
    <>
      {trips.map((trip) => (
        <TripCard key={trip._id!} trip={trip} />
      ))}
    </>
  );
};

export default TripCluster;
