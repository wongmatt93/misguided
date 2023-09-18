import { Trip } from "../../../models/Trip";
import FeedCard from "./FeedCard/FeedCard";
import "./FeedContainer.css";

interface Props {
  uid: string;
  feedTrips: Trip[];
  refreshFeedTrips: () => Promise<void>;
}

const FeedContainer = ({ uid, feedTrips, refreshFeedTrips }: Props) => {
  return (
    <ul className="FeedContainer">
      {feedTrips.map((trip) => (
        <FeedCard
          key={trip._id!}
          uid={uid}
          trip={trip}
          refreshFeedTrips={refreshFeedTrips}
        />
      ))}
    </ul>
  );
};

export default FeedContainer;
