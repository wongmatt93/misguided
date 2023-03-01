import { RiGalleryFill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import FollowContext from "../../context/FollowContext";
import Trip from "../../models/Trip";
import { getTripById } from "../../services/tripServices";
import { sortTripsDescending, today } from "../../utils/dateFunctions";
import FeedCard from "./feedCard/FeedCard";
import "./FeedContainer.css";

const FeedContainer = () => {
  const { userProfile } = useContext(AuthContext);
  const { following } = useContext(FollowContext);
  const [friendsPastTrips, setFriendsPastTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const trips: Trip[] = [];

    userProfile &&
      Promise.allSettled(
        following.concat(userProfile).map((user) =>
          Promise.allSettled(
            user.trips.map(
              (trip) =>
                trip.accepted &&
                getTripById(trip.tripId).then((response) => {
                  response.completed &&
                    today.getTime() -
                      (response.endDate
                        ? Number(response.endDate)
                        : Number(response.startDate)) >=
                      0 &&
                    trips.push(response);
                })
            )
          )
        )
      ).then(() => {
        const uniqueTrips: Trip[] = trips.filter(
          (v, i, a) => a.findIndex((v2) => v2._id! === v._id!) === i
        );
        setFriendsPastTrips(sortTripsDescending(uniqueTrips));
      });
  }, [following, userProfile]);

  return (
    <main className="FeedContainer">
      {friendsPastTrips.length > 0 ? (
        <ul>
          {friendsPastTrips.map((trip) => (
            <FeedCard key={trip._id!} trip={trip} />
          ))}
        </ul>
      ) : (
        <div className="empty">
          <RiGalleryFill />
          <p>Your feed is currently empty.</p>
          <p>Search for users to follow!</p>
        </div>
      )}
    </main>
  );
};

export default FeedContainer;
