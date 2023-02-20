import { useContext, useEffect, useState } from "react";
import FollowContext from "../../context/FollowContext";
import Trip from "../../models/Trip";
import { getTripById } from "../../services/tripServices";
import { sortTripsDescending, today } from "../../utils/dateFunctions";
import FeedCard from "./feedCard/FeedCard";
import "./FeedContainer.css";

const FeedContainer = () => {
  const { following } = useContext(FollowContext);
  const [friendsPastTrips, setFriendsPastTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const trips: Trip[] = [];

    Promise.allSettled(
      following.map((user) =>
        Promise.allSettled(
          user.trips.map(
            (trip) =>
              trip.accepted &&
              getTripById(trip.tripId).then((response) => {
                response.completed &&
                  today.getTime() - new Date(response.date2).getTime() >= 0 &&
                  trips.push(response);
              })
          )
        )
      )
    ).then(() => {
      setFriendsPastTrips(sortTripsDescending(trips));
    });
  }, [following]);

  return (
    <main className="FeedContainer">
      <ul>
        {friendsPastTrips.map((trip) => (
          <FeedCard key={trip._id!} trip={trip} />
        ))}
      </ul>
    </main>
  );
};

export default FeedContainer;
