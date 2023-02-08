import { useContext, useEffect, useRef, useState } from "react";
import FriendsContext from "../../../context/FriendsContext";
import Trip from "../../../models/Trip";
import { getTripById } from "../../../services/tripServices";
import FeedCard from "./FeedCard";
import "./FriendsFeed.css";

const FriendsFeed = () => {
  const { friends } = useContext(FriendsContext);
  const [friendsPastTrips, setFriendsPastTrips] = useState<Trip[]>([]);
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;

    let today: Date = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    today = new Date(yyyy + "-" + mm + "-" + dd);

    friends.forEach((friend) => {
      friend.trips.forEach((trip) => {
        if (trip.accepted) {
          getTripById(trip.tripId).then((response) => {
            if (response.completed) {
              const endDate = new Date(response.date2);
              if (today.getTime() - endDate.getTime() >= 0) {
                setFriendsPastTrips((prev) => [...prev, response]);
              }
            }
          });
        }
      });
    });

    dataFetchedRef.current = true;
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
