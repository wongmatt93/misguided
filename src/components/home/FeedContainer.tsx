import { RiCameraOffFill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import FollowContext from "../../context/FollowContext";
import Trip from "../../models/Trip";
import { getTripById } from "../../services/tripServices";
import { sortTripsDescending, today } from "../../utils/dateFunctions";
import FeedCard from "./feedCard/FeedCard";
import "./FeedContainer.css";
import useTimer from "../../hooks/useTimer";
import LoadingCamera from "../common/LoadingCamera";

const FeedContainer = () => {
  const { userProfile } = useContext(AuthContext);
  const { following } = useContext(FollowContext);
  const [friendsPastTrips, setFriendsPastTrips] = useState<Trip[]>([]);
  const timesUp = useTimer(2000);

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
      {!timesUp && <LoadingCamera />}
      {friendsPastTrips.length > 0 ? (
        <ul style={{ display: timesUp ? "block" : "none" }}>
          {friendsPastTrips.map((trip) => (
            <FeedCard key={trip._id!} trip={trip} />
          ))}
        </ul>
      ) : (
        <div className="empty">
          <RiCameraOffFill />
          <p>Your feed is currently empty.</p>
          <p>Search for users to follow!</p>
        </div>
      )}
    </main>
  );
};

export default FeedContainer;
