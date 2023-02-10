import { useContext, useEffect, useState } from "react";
import FriendsContext from "../../../context/FriendsContext";
import Trip from "../../../models/Trip";
import { getTripById } from "../../../services/tripServices";
import FeedCard from "./FeedCard";
import "./FriendsFeed.css";

const FriendsFeed = () => {
  const { friends } = useContext(FriendsContext);
  const [friendsPastTrips, setFriendsPastTrips] = useState<Trip[]>([]);
  const [fullyLoaded, setFullyLoaded] = useState(false);

  useEffect(() => {
    const trips: Trip[] = [];

    let today: Date = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    today = new Date(yyyy + "-" + mm + "-" + dd);

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
    ).then(() => setFriendsPastTrips(trips));

    setFullyLoaded(true);
  }, [friends]);

  return (
    <div className="FriendsFeed">
      {fullyLoaded && (
        <>
          <ul>
            {friendsPastTrips.map((trip) => (
              <FeedCard key={trip._id!} trip={trip} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FriendsFeed;
