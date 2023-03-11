import Trip from "../../../models/Trip";
import PastTripCard from "./PastTripCard";
import "./PastTripsCluster.css";

interface Props {
  trips: Trip[];
}

const PastTripsCluster = ({ trips }: Props) => {
  return (
    <>
      {trips.map((trip) => (
        <PastTripCard key={trip._id} trip={trip} />
      ))}
    </>
  );
};

export default PastTripsCluster;
