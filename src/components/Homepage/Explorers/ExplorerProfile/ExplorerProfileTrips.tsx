import { Trip } from "../../../../models/Trip";
import ExplorerProfileTripCard from "./ExplorerProfileTripCard";
import "./ExplorerProfileTrips.css";

interface Props {
  uid: string;
  completedTrips: Trip[];
}

const ExplorerProfileTrips = ({ uid, completedTrips }: Props) => {
  return (
    <ul className="ExplorerProfileTrips">
      {completedTrips.map((trip) => (
        <ExplorerProfileTripCard key={trip._id} uid={uid} trip={trip} />
      ))}
    </ul>
  );
};

export default ExplorerProfileTrips;
