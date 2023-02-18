import { useContext, useEffect, useState } from "react";
import FriendsContext from "../../../context/FriendsContext";
import Trip from "../../../models/Trip";
import { getTripById } from "../../../services/tripServices";
import { sortTripsDescending, today } from "../../../utils/dateFunctions";
import FeedCard from "./FeedCard";
import "./FriendsFeed.css";

const FriendsFeed = () => {
  const { friends } = useContext(FriendsContext);
  const [friendsPastTrips, setFriendsPastTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const trips: Trip[] = [];

    Promise.allSettled(
      friends.map((friend) =>
        Promise.allSettled(
          friend.trips.map(
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
  }, [friends]);

  return (
    <div className="FriendsFeed">
      <ul>
        {friendsPastTrips.map((trip) => (
          <FeedCard key={trip._id!} trip={trip} />
        ))}
      </ul>
    </div>
  );
};

export default FriendsFeed;