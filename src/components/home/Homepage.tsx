import { useContext, useEffect, useState } from "react";
import { RiCameraOffFill } from "react-icons/ri";
import AuthContext from "../../context/AuthContext";
import FollowContext from "../../context/FollowContext";
import useTimer from "../../hooks/useTimer";
import Trip from "../../models/Trip";
import { getTripById } from "../../services/tripServices";
import { sortTripsDescending, today } from "../../utils/dateFunctions";
import LoadingCamera from "../common/LoadingCamera";
import FeedCard from "./FeedCard/FeedCard";
import "./Homepage.css";

const Homepage = () => {
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
    <section className="Homepage">
      {!timesUp && <LoadingCamera />}
      {friendsPastTrips.length > 0 ? (
        <ul
          className="feed-container"
          style={{ display: timesUp ? "block" : "none" }}
        >
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
    </section>
  );
};

export default Homepage;
